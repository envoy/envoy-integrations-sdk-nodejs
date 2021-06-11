[@envoy/envoy-integrations-sdk](../README.md) / EnvoyBaseRequest

# Interface: EnvoyBaseRequest<Meta, Payload\>

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

- `VerifiedRequest`

  ↳ **EnvoyBaseRequest**

## Table of contents

### Properties

- [[VERIFIED]](envoybaserequest.md#[verified])
- [envoy](envoybaserequest.md#envoy)

## Properties

### [VERIFIED]

• **[VERIFIED]**: `boolean`

#### Inherited from

VerifiedRequest.\_\_@VERIFIED@1237

#### Defined in

[EnvoyRequest.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyRequest.ts#L16)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../classes/envoypluginsdk.md)<Meta, Payload\>

#### Defined in

[EnvoyRequest.ts:28](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyRequest.ts#L28)
