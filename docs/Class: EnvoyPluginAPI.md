API endpoints for *plugin-scoped* tokens.

## Hierarchy

- `EnvoyAPI`

  ↳ **EnvoyPluginAPI**

## Table of contents

### Constructors

- [constructor](../wiki/Class:%20EnvoyPluginAPI#constructor)

### Properties

- [axios](../wiki/Class:%20EnvoyPluginAPI#axios)

### Methods

- [createNotification](../wiki/Class:%20EnvoyPluginAPI#createnotification)
- [getPluginInstallConfig](../wiki/Class:%20EnvoyPluginAPI#getplugininstallconfig)
- [setPluginInstallConfig](../wiki/Class:%20EnvoyPluginAPI#setplugininstallconfig)
- [storagePipeline](../wiki/Class:%20EnvoyPluginAPI#storagepipeline)
- [updateJob](../wiki/Class:%20EnvoyPluginAPI#updatejob)
- [login](../wiki/Class:%20EnvoyPluginAPI#login)

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

[EnvoyAPI.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyAPI.ts#L58)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[EnvoyAPI.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyAPI.ts#L31)

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

[EnvoyPluginAPI.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L50)

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

[EnvoyPluginAPI.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L21)

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

[EnvoyPluginAPI.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L26)

___

### storagePipeline

▸ **storagePipeline**(`commands`, `installId?`): `Promise`<(``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem))[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `commands` | `EnvoyStorageCommand`[] |
| `installId?` | `string` |

#### Returns

`Promise`<(``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem))[]\>

#### Defined in

[EnvoyPluginAPI.ts:34](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L34)

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

[EnvoyPluginAPI.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L13)

___

### login

▸ `Static` **login**(`id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../wiki/Home#envoymetaauth)\>

Gets a plugin access token using `client_credentials` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../wiki/Home#envoymetaauth)\>

#### Defined in

[EnvoyPluginAPI.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginAPI.ts#L61)
