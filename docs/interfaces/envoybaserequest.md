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

- [VerifiedRequest](verifiedrequest.md)

  ↳ **EnvoyBaseRequest**

## Table of contents

### Properties

- [[VERIFIED]](envoybaserequest.md#[verified])
- [envoy](envoybaserequest.md#envoy)

## Properties

### [VERIFIED]

• **[VERIFIED]**: `boolean`

#### Inherited from

[VerifiedRequest](verifiedrequest.md).[[VERIFIED]](verifiedrequest.md#[verified])

#### Defined in

[EnvoyRequest.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyRequest.ts#L10)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../classes/envoypluginsdk.md)<Meta, Payload\>

#### Defined in

[EnvoyRequest.ts:20](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyRequest.ts#L20)
