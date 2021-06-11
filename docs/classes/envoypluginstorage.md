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

[sdk/EnvoyPluginStorage.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L16)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[sdk/EnvoyPluginStorage.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L14)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[sdk/EnvoyPluginStorage.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L16)

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

[sdk/EnvoyPluginStorage.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L33)

___

### pipeline

▸ **pipeline**(): `default`

Creates a new pipeline instance.

#### Returns

`default`

#### Defined in

[sdk/EnvoyPluginStorage.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L26)

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

[sdk/EnvoyPluginStorage.ts:40](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L40)

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

[sdk/EnvoyPluginStorage.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L47)

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

[sdk/EnvoyPluginStorage.ts:54](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L54)

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

[sdk/EnvoyPluginStorage.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginStorage.ts#L62)
