[@envoy/envoy-integrations-sdk](../README.md) / [index](../modules/index.md) / EnvoyBaseRequest

# Interface: EnvoyBaseRequest<Meta, Payload\>

[index](../modules/index.md).EnvoyBaseRequest

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta`: `EnvoyMeta` = `EnvoyMeta` |
| `Payload` | `Payload` = `unknown` |

## Hierarchy

- [VerifiedRequest](index.verifiedrequest.md)

  ↳ **EnvoyBaseRequest**

## Table of contents

### Properties

- [[VERIFIED]](index.envoybaserequest.md#[verified])
- [envoy](index.envoybaserequest.md#envoy)

## Properties

### [VERIFIED]

• **[VERIFIED]**: `boolean`

#### Inherited from

[VerifiedRequest](index.verifiedrequest.md).[[VERIFIED]](index.verifiedrequest.md#[verified])

#### Defined in

[EnvoyRequest.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L10)

___

### envoy

• **envoy**: [EnvoyPluginSDK](../classes/index.envoypluginsdk.md)<Meta, Payload\>

#### Defined in

[EnvoyRequest.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L14)
