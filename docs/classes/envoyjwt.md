[@envoy/envoy-integrations-sdk](../README.md) / EnvoyJWT

# Class: EnvoyJWT

Helper to encode and decode JWTs.

## Table of contents

### Constructors

- [constructor](envoyjwt.md#constructor)

### Methods

- [decode](envoyjwt.md#decode)
- [encode](envoyjwt.md#encode)

## Constructors

### constructor

• **new EnvoyJWT**(`secret?`, `algorithm?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `secret` | `string` | `undefined` |
| `algorithm` | `Algorithm` | 'HS256' |

#### Defined in

[EnvoyJWT.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/981d571/src/EnvoyJWT.ts#L12)

## Methods

### decode

▸ **decode**(`token`, `options?`): `Record`<string, unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `options` | `VerifyOptions` |

#### Returns

`Record`<string, unknown\>

#### Defined in

[EnvoyJWT.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/981d571/src/EnvoyJWT.ts#L39)

___

### encode

▸ **encode**(`subject`, `expiresIn`, `payload?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `subject` | ``null`` \| `string` \| `number` |
| `expiresIn` | ``null`` \| `string` \| `number` |
| `payload` | `Record`<string, unknown\> |

#### Returns

`string`

#### Defined in

[EnvoyJWT.ts:22](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/981d571/src/EnvoyJWT.ts#L22)
