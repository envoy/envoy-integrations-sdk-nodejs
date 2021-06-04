[@envoy/envoy-integrations-sdk](../README.md) / EnvoyUserAPI

# Class: EnvoyUserAPI

API endpoints for *user-scoped* tokens.
To access Envoy resources, this is the API you'd want.

## Hierarchy

- `EnvoyAPI`

  ↳ **EnvoyUserAPI**

## Table of contents

### Constructors

- [constructor](envoyuserapi.md#constructor)

### Properties

- [axios](envoyuserapi.md#axios)

### Methods

- [loginAsPluginInstaller](envoyuserapi.md#loginasplugininstaller)
- [loginAsUser](envoyuserapi.md#loginasuser)

## Constructors

### constructor

• **new EnvoyUserAPI**(`accessToken`)

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

### loginAsPluginInstaller

▸ `Static` **loginAsPluginInstaller**(`installId`, `id?`, `secret?`): `Promise`<EnvoyMetaAuth\>

Gets a user access token using `plugin_install` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<EnvoyMetaAuth\>

#### Defined in

[EnvoyUserAPI.ts:177](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyUserAPI.ts#L177)

___

### loginAsUser

▸ `Static` **loginAsUser**(`username`, `password`, `id?`, `secret?`): `Promise`<EnvoyMetaAuth\>

Gets a user access token using `password` as the grant type (discouraged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<EnvoyMetaAuth\>

#### Defined in

[EnvoyUserAPI.ts:150](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyUserAPI.ts#L150)
