[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginJob

# Class: EnvoyPluginJob

A "job" is an event, like `entry_sign_in`.
When your plugin handles the event, you can use this job concept
to update the status (e.g. complete, failed, ignored)
as well as attach extra data to the event's subject
(e.g. showing a generated card number in the dashboard for a visitor on `entry_sign_in`).

## Table of contents

### Constructors

- [constructor](envoypluginjob.md#constructor)

### Properties

- [api](envoypluginjob.md#api)
- [id](envoypluginjob.md#id)

### Methods

- [attach](envoypluginjob.md#attach)
- [complete](envoypluginjob.md#complete)
- [fail](envoypluginjob.md#fail)
- [ignore](envoypluginjob.md#ignore)
- [update](envoypluginjob.md#update)

## Constructors

### constructor

• **new EnvoyPluginJob**(`pluginAPI`, `jobId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](envoypluginapi.md) |
| `jobId` | `string` |

#### Defined in

[sdk/EnvoyPluginJob.ts:17](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L17)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[sdk/EnvoyPluginJob.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L15)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[sdk/EnvoyPluginJob.ts:17](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L17)

## Methods

### attach

▸ **attach**(...`attachments`): `Promise`<void\>

Add attachments to this job.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:48](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L48)

___

### complete

▸ **complete**(`message`, ...`attachments`): `Promise`<void\>

Reports that the job is complete.

Instead of calling this directly, you can return a 200 response from the job's event handler,
using {@link EnvoyRequest.send}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L58)

___

### fail

▸ **fail**(`message`, `reason`): `Promise`<void\>

Reports that the job is ignored.

Instead of calling this directly, you can return a 400 response from the job's event handler,
using {@link EnvoyRequest.sendFailed}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `reason` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L78)

___

### ignore

▸ **ignore**(`message`, `reason`): `Promise`<void\>

Reports that the job is ignored.

Instead of calling this directly, you can return a 400 response from the job's event handler,
using {@link EnvoyRequest.sendIgnored}.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `reason` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:68](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L68)

___

### update

▸ **update**(`message`, ...`attachments`): `Promise`<void\>

Updates the job with a new message and attachments.

Can be used to periodically update long-running jobs.

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:87](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyPluginJob.ts#L87)
