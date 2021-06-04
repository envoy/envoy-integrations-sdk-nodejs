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

[EnvoyPluginStorage.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L13)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[EnvoyPluginStorage.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L11)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[EnvoyPluginStorage.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L13)

## Methods

### get

▸ **get**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Wrapper for single pipeline get.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L30)

___

### pipeline

▸ **pipeline**(): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Creates a new pipeline instance.

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStorage.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L23)

___

### set

▸ **set**(`key`, `value`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Wrapper for single pipeline set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L37)

___

### setUnique

▸ **setUnique**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:44](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L44)

___

### setUniqueNum

▸ **setUniqueNum**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueNumOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:51](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L51)

___

### unset

▸ **unset**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Wrapper for single pipeline unset.
Returns null if the item did not previously exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d2a4136/src/EnvoyPluginStorage.ts#L59)
