[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginStoragePipeline

# Class: EnvoyPluginStoragePipeline

Builds up a request pipeline for submitting storage commands.

## Table of contents

### Constructors

- [constructor](envoypluginstoragepipeline.md#constructor)

### Properties

- [api](envoypluginstoragepipeline.md#api)
- [installId](envoypluginstoragepipeline.md#installid)

### Methods

- [addCommand](envoypluginstoragepipeline.md#addcommand)
- [execute](envoypluginstoragepipeline.md#execute)
- [executeSingle](envoypluginstoragepipeline.md#executesingle)
- [get](envoypluginstoragepipeline.md#get)
- [set](envoypluginstoragepipeline.md#set)
- [setUnique](envoypluginstoragepipeline.md#setunique)
- [setUniqueNum](envoypluginstoragepipeline.md#setuniquenum)
- [unset](envoypluginstoragepipeline.md#unset)

## Constructors

### constructor

• **new EnvoyPluginStoragePipeline**(`pluginAPI`, `installId?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](envoypluginapi.md) |
| `installId?` | `string` |

#### Defined in

[EnvoyPluginStoragePipeline.ts:18](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L18)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L14)

___

### installId

• `Readonly` **installId**: `undefined` \| `string`

#### Defined in

[EnvoyPluginStoragePipeline.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L16)

## Methods

### addCommand

▸ **addCommand**(`command`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | `EnvoyStorageCommand` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L41)

___

### execute

▸ **execute**(): `Promise`<(``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem))[]\>

Executes all the commands in the pipeline.

#### Returns

`Promise`<(``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem))[]\>

#### Defined in

[EnvoyPluginStoragePipeline.ts:29](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L29)

___

### executeSingle

▸ **executeSingle**(): `Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

Executes the pipeline and returns the first result.

#### Returns

`Promise`<``null`` \| [EnvoyStorageItem](../README.md#envoystorageitem)\>

#### Defined in

[EnvoyPluginStoragePipeline.ts:36](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L36)

___

### get

▸ **get**(`key`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Gets a storage item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:49](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L49)

___

### set

▸ **set**(`key`, `value`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Sets a value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:57](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L57)

___

### setUnique

▸ **setUnique**(`key`, `options?`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Sets a unique value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueOptions` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:65](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L65)

___

### setUniqueNum

▸ **setUniqueNum**(`key`, `options?`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Sets a unique number value for a storage item,
and returns that item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `options` | `EnvoyStorageSetUniqueNumOptions` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L73)

___

### unset

▸ **unset**(`key`): [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

Unsets a storage item.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md)

#### Defined in

[EnvoyPluginStoragePipeline.ts:80](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginStoragePipeline.ts#L80)
