[@envoy/envoy-integrations-sdk](../README.md) / EnvoyBaseRequest

# Interface: EnvoyBaseRequest<Meta, Payload\>

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

[EnvoyRequest.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L10)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../classes/envoypluginsdk.md)<Meta, Payload\>

#### Defined in

[EnvoyRequest.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L14)
