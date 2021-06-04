A key-value storage that can be scoped to a specific install,
or to the plugin itself.

## Table of contents

### Constructors

- [constructor](../wiki/Class:%20EnvoyPluginStorage#constructor)

### Properties

- [api](../wiki/Class:%20EnvoyPluginStorage#api)
- [installId](../wiki/Class:%20EnvoyPluginStorage#installid)

### Methods

- [get](../wiki/Class:%20EnvoyPluginStorage#get)
- [pipeline](../wiki/Class:%20EnvoyPluginStorage#pipeline)
- [set](../wiki/Class:%20EnvoyPluginStorage#set)
- [setUnique](../wiki/Class:%20EnvoyPluginStorage#setunique)
- [setUniqueNum](../wiki/Class:%20EnvoyPluginStorage#setuniquenum)
- [unset](../wiki/Class:%20EnvoyPluginStorage#unset)

## Constructors

### constructor

• **new EnvoyPluginStorage**(`pluginAPI`, `installId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI) |
| `installId?` | `string` |

#### Defined in

[EnvoyPluginStorage.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L13)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI)

#### Defined in

[EnvoyPluginStorage.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L11)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[EnvoyPluginStorage.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L13)

## Methods

### get

▸ **get**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Wrapper for single pipeline get.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L30)

___

### pipeline

▸ **pipeline**(): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Creates a new pipeline instance.

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStorage.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L23)

___

### set

▸ **set**(`key`, `value`): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Wrapper for single pipeline set.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L37)

___

### setUnique

▸ **setUnique**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:44](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L44)

___

### setUniqueNum

▸ **setUniqueNum**(`key`, `options?`): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Wrapper for single pipeline setUnique.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueNumOptions` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:51](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L51)

___

### unset

▸ **unset**(`key`): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Wrapper for single pipeline unset.
Returns null if the item did not previously exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStorage.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStorage.ts#L59)
