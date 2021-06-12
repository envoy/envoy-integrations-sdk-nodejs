[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginStorage

# Class: EnvoyPluginStorage

A key-value storage that can be scoped to a specific install,
or to the plugin itself.

## Table of contents

### Constructors

- [constructor](envoypluginstorage.md#constructor)

### Properties

- [api](envoypluginstorage.md#api)
- [installId](envoypluginstorage.md#installid)

### Methods

- [get](envoypluginstorage.md#get)
- [pipeline](envoypluginstorage.md#pipeline)
- [set](envoypluginstorage.md#set)
- [setUnique](envoypluginstorage.md#setunique)
- [setUniqueNum](envoypluginstorage.md#setuniquenum)
- [unset](envoypluginstorage.md#unset)

## Constructors

### constructor

• **new EnvoyPluginStorage**(`pluginAPI`, `installId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](envoypluginapi.md) |
| `installId?` | `string` |

#### Defined in

[sdk/EnvoyPluginStorage.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L16)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[sdk/EnvoyPluginStorage.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L14)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[sdk/EnvoyPluginStorage.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L16)

## Methods

### get

▸ **get**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Gets a single [EnvoyStorageItem](../README.md#envoystorageitem) from storage.

Wrapper for single pipeline get.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[sdk/EnvoyPluginStorage.ts:35](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L35)

___

### pipeline

▸ **pipeline**(): `default`

Creates a new pipeline instance.

#### Returns

`default`

#### Defined in

[sdk/EnvoyPluginStorage.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L26)

___

### set

▸ **set**(`key`, `value`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Sets a single [EnvoyStorageItem](../README.md#envoystorageitem) from storage.

Wrapper for single pipeline set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[sdk/EnvoyPluginStorage.ts:44](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L44)

___

### setUnique

▸ **setUnique**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Sets a single unique string [EnvoyStorageItem](../README.md#envoystorageitem) from storage.

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[sdk/EnvoyPluginStorage.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L53)

___

### setUniqueNum

▸ **setUniqueNum**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Sets a single unique number [EnvoyStorageItem](../README.md#envoystorageitem) from storage.

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueNumOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[sdk/EnvoyPluginStorage.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L62)

___

### unset

▸ **unset**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Unsets an [EnvoyStorageItem](../README.md#envoystorageitem) from storage. Returns null if the item did not previously exist.

Wrapper for single pipeline unset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[sdk/EnvoyPluginStorage.ts:71](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/7f53677/src/sdk/EnvoyPluginStorage.ts#L71)
