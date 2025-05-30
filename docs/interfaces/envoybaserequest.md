[@envoy/envoy-integrations-sdk](../README.md) / EnvoyBaseRequest

# Interface: EnvoyBaseRequest<Meta, Payload\>

Base type for Envoy requests.
You probably won't need to use this type directly.
For routes, use [EnvoyRouteRequest](../README.md#envoyrouterequest),
and for events, use [EnvoyEntryEventRequest](../README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](../README.md#envoyinviteeventrequest).

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta` = `EnvoyMeta` |
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

VerifiedRequest.\_\_@VERIFIED@1313

#### Defined in

[sdk/EnvoyRequest.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L23)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../classes/envoypluginsdk.md)<Meta, Payload\>

#### Defined in

[sdk/EnvoyRequest.ts:35](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L35)
