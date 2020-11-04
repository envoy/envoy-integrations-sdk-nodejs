---
description: Interacts with the storage pipeline system.
---

# EnvoyPluginStoragePipeline

## Constructor

#### const storagePipeline = new EnvoyPluginStoragePipeline\(pluginAPI, \[installId\]\)

| Param | Type | Default |
| :--- | :--- | :--- |
| pluginAPI | `EnvoyAPI` |  |
| \[installId\] | `number` \| `null` |  |

## Properties and Methods

* _instance_
  * .api : `EnvoyAPI`
  * .installId : `number` \| `null`
  * .commands : `Array.<Command>`
  * .execute\(\) ⇒ `Promise.<Array.<(Command|null)>>`
  * .executeSingle\(\) ⇒ `Promise.<PluginStorageItem>`
  * .addCommand\(command\) ⇒ `EnvoyPluginStoragePipeline`
  * .get\(key\) ⇒ `EnvoyPluginStoragePipeline`
  * .set\(key, value\) ⇒ `EnvoyPluginStoragePipeline`
  * .setUnique\(key, \[options\]\) ⇒ `EnvoyPluginStoragePipeline`
  * .unset\(key\) ⇒ `EnvoyPluginStoragePipeline`

#### envoyPluginStoragePipeline.execute\(\) ⇒ `Promise.<Array.<(Command|null)>>`

Executes all the commands in the pipeline.

**Kind**: instance method of `EnvoyPluginStoragePipeline`  


#### envoyPluginStoragePipeline.executeSingle\(\) ⇒ `Promise.<PluginStorageItem>`

Executes the pipeline and returns the first result.

**Kind**: instance method of `EnvoyPluginStoragePipeline`  


#### envoyPluginStoragePipeline.addCommand\(command\) ⇒ `EnvoyPluginStoragePipeline`

**Kind**: instance method of `EnvoyPluginStoragePipeline`

| Param | Type |
| :--- | :--- |
| command | `Command` |

#### envoyPluginStoragePipeline.get\(key\) ⇒ `EnvoyPluginStoragePipeline`

Gets a storage item.

**Kind**: instance method of `EnvoyPluginStoragePipeline`

| Param | Type |
| :--- | :--- |
| key | `string` |

#### envoyPluginStoragePipeline.set\(key, value\) ⇒ `EnvoyPluginStoragePipeline`

Sets a value for a storage item, and returns that item.

**Kind**: instance method of `EnvoyPluginStoragePipeline`

| Param | Type |
| :--- | :--- |
| key | `string` |
| value |  |

#### envoyPluginStoragePipeline.setUnique\(key, \[options\]\) ⇒ `EnvoyPluginStoragePipeline`

Sets a unique value for a storage item, and returns that item.

**Kind**: instance method of `EnvoyPluginStoragePipeline`

| Param | Type |
| :--- | :--- |
| key | `string` |
| \[options\] | `UniqueOptions` |

#### envoyPluginStoragePipeline.unset\(key\) ⇒ `EnvoyPluginStoragePipeline`

Unsets a storage item.

**Kind**: instance method of `EnvoyPluginStoragePipeline`

| Param | Type |
| :--- | :--- |
| key | `string` |

## Related Classes

### PluginStorageItem : `Object`

**Kind**: global typedef  
**Properties**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value |  |

### Command : `Object`

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| action | `string` | the type of command to run |
| key | `string` | the key to operate on |

### UniqueOptions : `Object`

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| chars | `string` | `"\"0123456789\""` | the possible characters to pick from |
| size | `number` | `12` | the length of the value |

