[@envoy/envoy-integrations-sdk](../README.md) / [index](../modules/index.md) / EnvoySignatureVerifier

# Class: EnvoySignatureVerifier

[index](../modules/index.md).EnvoySignatureVerifier

Verifies that a request is coming from Envoy.

## Table of contents

### Constructors

- [constructor](index.envoysignatureverifier.md#constructor)

### Methods

- [verify](index.envoysignatureverifier.md#verify)

## Constructors

### constructor

• **new EnvoySignatureVerifier**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [EnvoySignatureVerifierOptions](../interfaces/index.envoysignatureverifieroptions.md) |

#### Defined in

[EnvoySignatureVerifier.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoySignatureVerifier.ts#L23)

## Methods

### verify

▸ **verify**(`req`, `rawBody`): `boolean`

Verifies that the signature provided matches the request body.

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\> |
| `rawBody` | `Buffer` |

#### Returns

`boolean`

#### Defined in

[EnvoySignatureVerifier.ts:36](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoySignatureVerifier.ts#L36)
