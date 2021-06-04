Base type for Envoy requests.
You probably won't need to use this type directly.
For routes, use `EnvoyRouteRequest`,
and for events, use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta`: `EnvoyMeta` = `EnvoyMeta` |
| `Payload` | `Payload` = `unknown` |

## Hierarchy

- [VerifiedRequest](../wiki/Interface:%20VerifiedRequest)

  ↳ **EnvoyBaseRequest**

## Table of contents

### Properties

- [[VERIFIED]](../wiki/Interface:%20EnvoyBaseRequest#%5Bverified%5D)
- [envoy](../wiki/Interface:%20EnvoyBaseRequest#envoy)

## Properties

### [VERIFIED]

• **[VERIFIED]**: `boolean`

#### Inherited from

[VerifiedRequest](../wiki/Interface:%20VerifiedRequest).[[VERIFIED]](../wiki/Interface:%20VerifiedRequest#%5Bverified%5D)

#### Defined in

[EnvoyRequest.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L10)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../wiki/Class:%20EnvoyPluginSDK)<Meta, Payload\>

#### Defined in

[EnvoyRequest.ts:20](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L20)
