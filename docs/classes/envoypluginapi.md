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
- [loginAsPlugin](envoypluginapi.md#loginasplugin)

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

[base/EnvoyAPI.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/base/EnvoyAPI.ts#L59)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[base/EnvoyAPI.ts:32](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/base/EnvoyAPI.ts#L32)

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

[sdk/EnvoyPluginAPI.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L61)

___

### getPluginInstallConfig

▸ **getPluginInstallConfig**(`installId`): `Promise`<Record<string, unknown\>\>

Fetches the current `config` saved for this install during setup by the customer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |

#### Returns

`Promise`<Record<string, unknown\>\>

#### Defined in

[sdk/EnvoyPluginAPI.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L27)

___

### setPluginInstallConfig

▸ **setPluginInstallConfig**(`installId`, `config`): `Promise`<void\>

Merges changes with the current `config` saved for this install during setup by the customer.

To remove an item from the saved `config`, set the item's key to `null`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `config` | `Record`<string, unknown\> |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginAPI.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L37)

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

[sdk/EnvoyPluginAPI.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L45)

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

[sdk/EnvoyPluginAPI.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L16)

___

### loginAsPlugin

▸ `Static` **loginAsPlugin**(`id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a plugin access token using `client_credentials` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyPluginAPI.ts:72](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyPluginAPI.ts#L72)
