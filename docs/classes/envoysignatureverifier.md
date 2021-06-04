[@envoy/envoy-integrations-sdk](../README.md) / EnvoySignatureVerifier

# Class: EnvoySignatureVerifier

Verifies that a request is coming from Envoy.

## Table of contents

### Constructors

- [constructor](envoysignatureverifier.md#constructor)

### Methods

- [verify](envoysignatureverifier.md#verify)

## Constructors

### constructor

• **new EnvoySignatureVerifier**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `EnvoySignatureVerifierOptions` |

#### Defined in

[EnvoySignatureVerifier.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoySignatureVerifier.ts#L23)

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

[EnvoySignatureVerifier.ts:36](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoySignatureVerifier.ts#L36)
