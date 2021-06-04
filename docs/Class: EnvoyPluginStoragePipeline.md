Builds up a request pipeline for submitting storage commands.

## Table of contents

### Constructors

- [constructor](../wiki/Class:%20EnvoyPluginStoragePipeline#constructor)

### Properties

- [api](../wiki/Class:%20EnvoyPluginStoragePipeline#api)
- [installId](../wiki/Class:%20EnvoyPluginStoragePipeline#installid)

### Methods

- [addCommand](../wiki/Class:%20EnvoyPluginStoragePipeline#addcommand)
- [execute](../wiki/Class:%20EnvoyPluginStoragePipeline#execute)
- [executeSingle](../wiki/Class:%20EnvoyPluginStoragePipeline#executesingle)
- [get](../wiki/Class:%20EnvoyPluginStoragePipeline#get)
- [set](../wiki/Class:%20EnvoyPluginStoragePipeline#set)
- [setUnique](../wiki/Class:%20EnvoyPluginStoragePipeline#setunique)
- [setUniqueNum](../wiki/Class:%20EnvoyPluginStoragePipeline#setuniquenum)
- [unset](../wiki/Class:%20EnvoyPluginStoragePipeline#unset)

## Constructors

### constructor

• **new EnvoyPluginStoragePipeline**(`pluginAPI`, `installId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI) |
| `installId?` | `string` |

#### Defined in

[EnvoyPluginStoragePipeline.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L16)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI)

#### Defined in

[EnvoyPluginStoragePipeline.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L12)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[EnvoyPluginStoragePipeline.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L14)

## Methods

### addCommand

▸ **addCommand**(`command`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `EnvoyStorageCommand` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L39)

___

### execute

▸ **execute**(): `Promise`<(``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem))[]\>

Executes all the commands in the pipeline.

#### Returns

`Promise`<(``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem))[]\>

#### Defined in

[EnvoyPluginStoragePipeline.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L27)

___

### executeSingle

▸ **executeSingle**(): `Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

Executes the pipeline and returns the first result.

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../wiki/Home#envoystorageitem)\>

#### Defined in

[EnvoyPluginStoragePipeline.ts:34](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L34)

___

### get

▸ **get**(`key`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Gets a storage item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L47)

___

### set

▸ **set**(`key`, `value`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Sets a value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:55](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L55)

___

### setUnique

▸ **setUnique**(`key`, `options?`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Sets a unique value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueOptions` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:63](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L63)

___

### setUniqueNum

▸ **setUniqueNum**(`key`, `options?`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Sets a unique number value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueNumOptions` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:71](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L71)

___

### unset

▸ **unset**(`key`): [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

Unsets a storage item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)

#### Defined in

[EnvoyPluginStoragePipeline.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginStoragePipeline.ts#L78)
