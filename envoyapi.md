---
description: Makes calls to the Envoy API.
---

# EnvoyAPI

Note that there are many API calls not covered by this class. Please add to this class as necessary!

## Constructor

#### const api = new EnvoyAPI\(token\)

| Param | Type |
| :--- | :--- |
| token | `string` |

## Properties and Methods

* _instance_
  * .flows\(locationId\) ⇒ `Promise.<Array.<EnvoyObject>>`
  * .signInPage\(flowId\) ⇒ `Promise.<EnvoyObject>`
  * .signInFields\(pageId\) ⇒ `Promise.<Array.<EnvoyObject>>`
  * .createNotificationEvent\(event\) ⇒ `Promise.<EnvoyObject>`
  * .updateJob\(jobId, updates\) ⇒ `Promise.<EnvoyObject>`
  * .storagePipeline\(commands, \[installId\]\) ⇒ `Promise.<Array.<PluginStorageItem>>`
* _static_
  * .login\(\[id\], \[secret\]\)

#### envoyAPI.flows\(locationId\) ⇒ `Promise.<Array.<EnvoyObject>>`

Fetches the visitor types for this location.

**Kind**: instance method of `EnvoyAPI`

| Param | Type |
| :--- | :--- |
| locationId | `string` \| `number` |

#### envoyAPI.signInPage\(flowId\) ⇒ `Promise.<EnvoyObject>`

Fetches the sign-in page details for this flow.

**Kind**: instance method of `EnvoyAPI`

| Param | Type |
| :--- | :--- |
| flowId | `string` \| `number` |

#### envoyAPI.signInFields\(pageId\) ⇒ `Promise.<Array.<EnvoyObject>>`

Fetches the sign-in fields for this page.

**Kind**: instance method of `EnvoyAPI`

| Param | Type |
| :--- | :--- |
| pageId | `string` \| `number` |

#### envoyAPI.createNotificationEvent\(event\) ⇒ `Promise.<EnvoyObject>`

Creates a notification event.

**Kind**: instance method of `EnvoyAPI`

| Param | Type |
| :--- | :--- |
| event | `Object` |

#### envoyAPI.updateJob\(jobId, updates\) ⇒ `Promise.<EnvoyObject>`

Updates the job.

**Kind**: instance method of `EnvoyAPI`

| Param | Type |
| :--- | :--- |
| jobId | `string` \| `uuid` |
| updates | `JobUpdate` |

#### envoyAPI.storagePipeline\(commands, \[installId\]\) ⇒ `Promise.<Array.<PluginStorageItem>>`

Runs the storage pipeline.

**Kind**: instance method of `EnvoyAPI`

| Param | Type | Default |
| :--- | :--- | :--- |
| commands | `Array.<Command>` |  |
| \[installId\] | `string` \| `uuid` \| `number` | `null` |

#### EnvoyAPI.login\(\[id\], \[secret\]\)

Gets an access token using client\_credentials as the grant type.

**Kind**: static method of `EnvoyAPI`

| Param | Type | Default |
| :--- | :--- | :--- |
| \[id\] | `string` | `process.env.ENVOY_CLIENT_ID` |
| \[secret\] | `string` | `process.env.ENVOY_CLIENT_SECRET` |

## Related Classes

### EnvoyObject : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| id | `string` \| `number` \| `uuid` | the ID of the object |
| attributes | `Object` | the object's attributes, in dash-case. |

### Attachment : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| type | `string` | only "password" supported :\( |
| label | `string` | the label to display in Garaje |
| value | `string` | the value to display in Garaje |

### JobUpdate : `Object`

**Properties**

| Name | Type |
| :--- | :--- |
| \[status\] | `string` |
| \[status\_message\] | `string` |
| \[failure\_reason\] | `string` |
| \[attachments\] | `Array.<Attachment>` |

### PluginStorageItem : `Object`

**Properties**

| Name | Type |
| :--- | :--- |
| key | `string` |
| value |  |

### Command : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| action | `string` | the type of command to run |
| key | `string` | the key to operate on |
