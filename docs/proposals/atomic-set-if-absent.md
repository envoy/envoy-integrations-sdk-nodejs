# Design: atomic `set_if_absent` for plugin storage

**Status:** Draft / proposal
**Author:** (via QA harness review of `pacs-integration-service#202`)
**Affected repos:** `envoy-integrations-sdk-nodejs` (client), `envoy-web` (platform storage service)

## Summary

Add a race-free "write only if the key is not already set" primitive to plugin storage:

- **SDK:** `storage.setIfAbsent(key, value, { ttlSeconds? })` and a matching pipeline command
  `set_if_absent`.
- **Platform (`envoy-web`):** a new `set_if_absent` action in `Platform::PluginStorageService`
  that `INSERT`s and relies on the existing unique index — the DB row *is* the lock. Returns the
  item on a win, `null` when the key is already held.

The result: exactly one of N concurrent invocations (across pods) wins the write. This gives
integrations a correct mutual-exclusion / claim primitive that today's API cannot express.

## Motivation

`pacs-integration-service#202` (By The Bay / Habitap) provisions a visitor credential from two
independent code paths that can run concurrently for the same visit:

1. the `invite_created` webhook (for near-term invites), and
2. the `registration_complete_email` **app-extension render** (create-if-missing).

Both do `getVisitor → (null) → createVisitor`. `getVisitor` is a *read*; the record that would make
it idempotent is only written **after** the external `POST`s complete. So two invocations that read
during that window both see "missing" and both create — producing **duplicate Habitap events**, and
because both write the same storage key afterward, the first event is orphaned (storage no longer
references it). The two paths often fire at the same instant (invite creation) and may land on
**different pods**, so in-process de-duplication cannot help.

This is the classic check-then-act (TOCTOU) race. It cannot be fixed with a better *read*: the
guarantee has to live on the *write*.

## Why existing primitives don't solve it

The full storage surface today is `get`, `set`, `set_unique`, `set_unique_num`, `unset`, `list`
(confirmed in SDK `2.5.2` and `envoy-web`'s `PluginStorageService`).

- `set` is an **unconditional** overwrite (last-write-wins) — no contention signal.
- `set_unique` / `set_unique_num` guarantee a unique *generated value* and **overwrite the key**.
  The uniqueness is on the value, not on key ownership, so they cannot elect a single winner for a
  known key.
- A user-land `get`-then-`set` "lock" reintroduces the exact TOCTOU race and is not cross-pod safe.
- There is no `ttl`/`expire`, and no lock/mutex utility anywhere in the SDK.

Importantly, the backend **already performs atomic conditional writes**: `set_unique` depends on a
`RecordNotUnique` rescue against a unique index (`PluginStorageUniqValue`), and `plugin_storage_items`
already has unique indexes on `(key, plugin_install_id) WHERE archived_at IS NULL` and
`(plugin_id, key)`. `set_if_absent` is a *simpler* use of the same mechanism.

## Proposed API (SDK)

```ts
// EnvoyPluginStorage
setIfAbsent<Value>(key: string, value: Value, options?: { ttlSeconds?: number }):
  Promise<EnvoyStorageItem<Value> | { key: string; value: undefined }>;
```

- Resolves to the **stored item** when this call wrote it (claim won).
- Resolves to `{ key, value: undefined }` when the key already existed (claim lost) — mirroring the
  existing `get`-miss / `setUnique`-exhaustion convention, so no new result shape is introduced.
- `ttlSeconds` (optional) gives the write an expiry so a crashed holder cannot wedge the key.

Pipeline form, for batching a claim with a follow-up read in one round-trip:

```ts
storage.pipeline()
  .setIfAbsent(`provision-lock:${visitId}`, { at: now }, { ttlSeconds: 120 })
  .get(`visit:${visitId}`)
  .execute();
```

## Wire protocol (`POST /api/v2/plugin-services/storage`)

**Request** (claim):

```json
{
  "install_id": "inst_abc123",
  "commands": [
    {
      "action": "set_if_absent",
      "key": "provision-lock:invite-222",
      "value": { "claimedAt": 1720370000000 },
      "ttlSeconds": 120
    }
  ]
}
```

**Response — won** (server wrote the row):

```json
{ "data": [ { "key": "provision-lock:invite-222", "value": { "claimedAt": 1720370000000 } } ] }
```

**Response — lost** (key already held):

```json
{ "data": [ null ] }
```

No controller or strong-params changes are required: `StorageController#pipeline` passes command
hashes through untouched, and results serialize exactly like `get`/`set` (item or `null`).

## Platform implementation (`envoy-web`)

Add one dispatch arm and one method to `Platform::PluginStorageService`. Unlike `set`, it must **not**
`unset` first — the whole point is to fail when the key exists:

```ruby
when 'set_if_absent'
  do_storage_item_set_if_absent(command[:key], command[:value])
```

```ruby
# Atomically create an item only if the key is not already set for this scope.
# Relies on the unique index on (key, plugin_install_id) / (plugin_id, key): the INSERT either
# wins or raises RecordNotUnique, which we treat as "already claimed" and return nil. Race-free
# across concurrent requests and pods without an explicit lock — the DB is the lock. Unlike `set`,
# it never overwrites an existing value.
def do_storage_item_set_if_absent(key, value = nil)
  plugin_storage_items.create!({ key: key, value: value })
rescue ::ActiveRecord::RecordNotUnique, ::ActiveRecord::RecordInvalid
  nil
end
```

This is correct on day one **without TTL**; TTL is a follow-up (below).

## Consumer usage (the fix in `pacs-integration-service`)

```ts
const lock = await pluginClient.storage.setIfAbsent(
  `provision-lock:${visit.id}`, { at: Date.now() }, { ttlSeconds: 120 },
);
if (lock.value === undefined) {
  return res.sendIgnored('Provisioning already in progress'); // app-ext: poll getVisitor, then render
}
// sole writer for this visit.id — safe to create
let userId = await pluginClient.getVisitor(visit);
if (!userId) userId = await pluginClient.createVisitor(visit);
// permanent idempotency marker stays `visit:{id}`; the lock only guards the create window.
```

The permanent idempotency key remains `visit:{visit.id}`. The claim only serializes the create
window; once the record is written, `getVisitor` short-circuits all future calls.

## TTL follow-up (optional, recommended for locks)

Without an expiry, a holder that crashes **after** claiming but **before** writing the durable record
wedges the key. Options:

1. **Consumer-side release** — `unset` the lock in a `finally`. Covers everything except hard pod
   death, which the "recoverable create" pattern (persist the external id immediately after the first
   external write) already de-fangs by making a re-create resumable rather than duplicative.
2. **Server-side TTL** — add `expires_at` to `plugin_storage_items`, have `set_if_absent` treat an
   expired row as absent (delete-then-insert within the rescue, or a partial-unique-index +
   sweeper). This makes the lock self-healing and is the clean long-term answer, at the cost of a
   migration.

The core PR ships option (1)-compatible behavior (no schema change); (2) can follow once the owning
team weighs the migration.

## Rollout

1. Land the platform `set_if_absent` action in `envoy-web` (backward-compatible; new action only).
2. Release the SDK with `setIfAbsent` (additive; no breaking changes).
3. Adopt in `pacs-integration-service` for BTB provisioning; other integrations can use it for any
   claim/mutex need.

Steps 1 and 2 are independent and safe to land in either order; the SDK method is inert until the
platform understands the action.
