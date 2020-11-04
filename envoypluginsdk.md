---
description: The Envoy SDK. Typically you'd interact with this directly.
---

# EnvoyPluginSDK

## Constructor

#### const envoy = new EnvoyPluginSDK\(body, \[isVerified=false\], \[pluginAccessToken=null\]\)

| Param | Type | Default |
| :--- | :--- | :--- |
| body | `Object` |  |
| \[isVerified\] | `boolean` | `false` |
| \[pluginAccessToken\] | `string` | `null` |

## Properties and Methods

* _instance_
  * .body : `Object`
    * Comes from `req.body`
  * .isVerified : `boolean`
    * If the request is verified to have come from Envoy
  * .pluginAccessToken : `string`
    * Access token for use with plugin-scoped endpoints
  * .meta : `Meta`
    * Metadata associated with this request
  * .payload : `EnvoyObject` \| `Object`
    * The object that the event is about
  * .userAPI : `EnvoyAPI`
    * Envoy's API scoped to the installer \(user\)
    * Applicable only in setup routes
  * .pluginAPI : `EnvoyAPI`
    * Envoy's API scoped to the plugin itself
    * For use with jobs and storage
  * .installStorage : `EnvoyPluginStorage`
    * Key/value storage scoped to the current install
  * .globalStorage : `EnvoyPluginStorage`
    * Key/value storage scoped across installs
  * .job : `EnvoyPluginJob`
    * Represents the current job
    * Applicable only in workers \(event listeners\)
  * .jobId : `string` \| `uuid` \| `null`
    * The current job ID
    * Applicable only in workers
  * .jwt : `EnvoyJWT`
    * Helper to encode and decode JWTs
  * .getJob\(jobId\) ⇒ `EnvoyPluginJob`
    * Load a job other than the current

#### envoyPluginSDK.getJob\(jobId\) ⇒ `EnvoyPluginJob`

Returns a job based on an ID.

**Kind**: instance method of `EnvoyPluginSDK`

| Param | Type |
| :--- | :--- |
| jobId | `string` \| `uuid` |

## Related Classes

### EnvoyObject : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| id | `string` \| `number` \| `uuid` | the ID of the object |
| attributes | `Object` | the object's attributes, in dash-case. |

### Meta : `Object`

**Properties**

| Name | Type | Description |
| :--- | :--- | :--- |
| event | `string` | the name of the event \(workers only\) |
| route | `string` | the name of the route \(routes only\) |
| plugin\_id | `number` | the plugin ID |
| install\_id | `number` | the plugin install ID |
| config | `Object` | config data for this install |
| params | `Object` | The optional URL query params sent in the request \(routes only\) |
| location | `EnvoyObject` | the location this event happened \(location installs only\) |
| company | `EnvoyObject` | the company that installed the plugin |
| auth | `Object` | contains the installer's `access_token` |

