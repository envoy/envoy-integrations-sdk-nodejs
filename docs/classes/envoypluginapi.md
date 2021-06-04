[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginAPI

# Class: EnvoyPluginAPI

API endpoints for *plugin-scoped* tokens.

## Hierarchy

- `EnvoyAPI`

  ↳ **EnvoyPluginAPI**

## Table of contents

### Constructors

- [constructor](envoypluginapi.md#constructor)

### Properties

- [axios](envoypluginapi.md#axios)

### Methods

- [login](envoypluginapi.md#login)

## Constructors

### constructor

• **new EnvoyPluginAPI**(`accessToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |

#### Inherited from

EnvoyAPI.constructor

#### Defined in

[EnvoyAPI.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyAPI.ts#L58)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[EnvoyAPI.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyAPI.ts#L31)

## Methods

### login

▸ `Static` **login**(`id?`, `secret?`): `Promise`<EnvoyMetaAuth\>

Gets a plugin access token using `client_credentials` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<EnvoyMetaAuth\>

#### Defined in

[EnvoyPluginAPI.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyPluginAPI.ts#L61)
