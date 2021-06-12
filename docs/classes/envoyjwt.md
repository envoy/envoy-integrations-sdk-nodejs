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

[util/EnvoyJWT.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/util/EnvoyJWT.ts#L15)

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

[util/EnvoyJWT.ts:42](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/util/EnvoyJWT.ts#L42)

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

[util/EnvoyJWT.ts:25](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/util/EnvoyJWT.ts#L25)
