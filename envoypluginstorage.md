---
description: Interacts with the key/value storage system.
---

# EnvoyPluginStorage

## Constructor

#### const storage = new EnvoyPluginStorage\(pluginAPI, \[installId\]\)

| Param | Type | Default |
| :--- | :--- | :--- |
| pluginAPI | `EnvoyAPI` |  |
| \[installId\] | `number` \| `null` |  |

## Properties and Methods

* _instance_
  * .api : `EnvoyAPI`
  * .installId : `number` \| `null`
  * .pipeline\(\) ⇒ `EnvoyPluginStoragePipeline`
  * .get\(key\) ⇒ `Promise.<(PluginStorageItem|null)>`
  * .set\(key, value\) ⇒ `Promise.<PluginStorageItem>`
  * .setUnique\(key, options\) ⇒ `Promise.<PluginStorageItem>`
  * .unset\(key\) ⇒ `Promise.<(PluginStorageItem|null)>`

#### envoyPluginStorage.pipeline\(\) ⇒ `EnvoyPluginStoragePipeline`

Creates a new pipeline instance.

**Kind**: instance method of `EnvoyPluginStorage`  


#### envoyPluginStorage.get\(key\) ⇒ `Promise.<(PluginStorageItem|null)>`

Wrapper for single pipeline get.

**Kind**: instance method of `EnvoyPluginStorage`

| Param | Type |
| :--- | :--- |
| key | `string` |

#### envoyPluginStorage.set\(key, value\) ⇒ `Promise.<PluginStorageItem>`

Wrapper for single pipeline set.

**Kind**: instance method of `EnvoyPluginStorage`

| Param | Type |
| :--- | :--- |
| key | `string` |
| value | `*` |

#### envoyPluginStorage.setUnique\(key, \[options\]\) ⇒ `Promise.<PluginStorageItem>`

Wrapper for single pipeline setUnique.

**Kind**: instance method of `EnvoyPluginStorage`

| Param | Type |
| :--- | :--- |
| key | `string` |
| \[options\] | `UniqueOptions` |

#### envoyPluginStorage.unset\(key\) ⇒ `Promise.<(PluginStorageItem|null)>`

Wrapper for single pipeline unset. Returns null if the item did not previously exist.

**Kind**: instance method of `EnvoyPluginStorage`

| Param | Type |
| :--- | :--- |
| key | `string` |

## Related Classes

### PluginStorageItem : `Object`

**Properties**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value |  |

### UniqueOptions : `Object`

**Properties**

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| chars | `string` | `"0123456789"` | the possible characters to pick from |
| size | `number` | `12` | the length of the value |

