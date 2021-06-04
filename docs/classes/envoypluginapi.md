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

- [createNotification](envoypluginapi.md#createnotification)
- [getPluginInstallConfig](envoypluginapi.md#getplugininstallconfig)
- [setPluginInstallConfig](envoypluginapi.md#setplugininstallconfig)
- [storagePipeline](envoypluginapi.md#storagepipeline)
- [updateJob](envoypluginapi.md#updatejob)
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

[EnvoyAPI.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyAPI.ts#L58)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[EnvoyAPI.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyAPI.ts#L31)

## Methods

### createNotification

▸ **createNotification**(`installId`, `params?`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `params` | `Object` |

#### Returns

`Promise`<void\>

#### Defined in

[EnvoyPluginAPI.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L50)

___

### getPluginInstallConfig

▸ **getPluginInstallConfig**(`installId`): `Promise`<Record<string, unknown\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |

#### Returns

`Promise`<Record<string, unknown\>\>

#### Defined in

[EnvoyPluginAPI.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L21)

___

### setPluginInstallConfig

▸ **setPluginInstallConfig**(`installId`, `config`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `config` | `Record`<string, unknown\> |

#### Returns

`Promise`<void\>

#### Defined in

[EnvoyPluginAPI.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L26)

___

### storagePipeline

▸ **storagePipeline**(`commands`, `installId?`): `Promise`<(``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `commands` | `EnvoyStorageCommand`[] |
| `installId?` | `string` |

#### Returns

`Promise`<(``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem))[]\>

#### Defined in

[EnvoyPluginAPI.ts:34](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L34)

___

### updateJob

▸ **updateJob**(`jobId`, `update`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |
| `update` | `default` |

#### Returns

`Promise`<void\>

#### Defined in

[EnvoyPluginAPI.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L13)

___

### login

▸ `Static` **login**(`id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a plugin access token using `client_credentials` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[EnvoyPluginAPI.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/fbf2ead/src/EnvoyPluginAPI.ts#L61)
