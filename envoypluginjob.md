---
description: 'Updates jobs by updating statuses, adding attachments, etc.'
---

# EnvoyPluginJob

## Constructor

#### const job = new EnvoyPluginJob\(pluginAPI, jobId\)

| Param | Type |
| :--- | :--- |
| pluginAPI | `EnvoyAPI` |
| jobId | `string` \| `uuid` |

## Properties and Methods

* _instance_
  * .api : `EnvoyAPI`
  * .id : `string` \| `uuid`
  * .execute\(status, message, \[reason\], \[attachments\]\) ⇒ `Promise.<EnvoyObject>`
  * .attach\(...attachments\) ⇒ `Promise.<EnvoyObject>`
  * .complete\(message, \[...attachments\]\) ⇒ `Promise.<EnvoyObject>`
  * .ignore\(message, reason\) ⇒ `Promise.<EnvoyObject>`
  * .fail\(message, reason\) ⇒ `Promise.<EnvoyObject>`
  * .update\(message, \[...attachments\]\) ⇒ `Promise.<EnvoyObject>` 

#### envoyPluginJob.execute\(status, message, \[reason\], \[attachments\]\) ⇒ `Promise.<EnvoyObject>`

Updates a job.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| status | `string` \| `null` |
| message | `string` \| `null` |
| \[reason\] | `string` \| `null` |
| \[attachments\] | `Array.<Attachment>` \| `null` |

#### envoyPluginJob.attach\(...attachments\) ⇒ `Promise.<EnvoyObject>`

Attaches items to an in-progress job.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| ...attachments | `Attachment` |

#### envoyPluginJob.complete\(message, \[...attachments\]\) ⇒ `Promise.<EnvoyObject>`

Completes the job.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| message | `string` |
| \[...attachments\] | `Attachment` |

#### envoyPluginJob.ignore\(message, reason\) ⇒ `Promise.<EnvoyObject>`

Ignores the job.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| message | `string` |
| reason | `string` |

#### envoyPluginJob.fail\(message, reason\) ⇒ `Promise.<EnvoyObject>`

Fails the job.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| message | `string` |
| reason | `string` |

#### envoyPluginJob.update\(message, \[...attachments\]\) ⇒ `Promise.<EnvoyObject>`

Updates the job's message, with optional attachments. Useful for multi-step jobs.

**Kind**: instance method of `EnvoyPluginJob`

| Param | Type |
| :--- | :--- |
| message |  |
| \[...attachments\] | `Attachment` |

## Related Classes

### Attachment : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| \[type\] | `string` | only "password" supported :\( |
| label | `string` | the label to display in Garaje |
| value | `string` | the value to display in Garaje |

