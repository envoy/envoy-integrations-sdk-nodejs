Sets up all relevant Envoy functions.
Attaches itself to every request object using our `middleware`,
to allow for easy access to Envoy functions.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta`: `EnvoyMeta` = `EnvoyMeta` |
| `Payload` | `Payload` = `unknown` |

## Table of contents

### Constructors

- [constructor](../wiki/Class:%20EnvoyPluginSDK#constructor)

### Accessors

- [getJob](../wiki/Class:%20EnvoyPluginSDK#getjob)
- [globalStorage](../wiki/Class:%20EnvoyPluginSDK#globalstorage)
- [installStorage](../wiki/Class:%20EnvoyPluginSDK#installstorage)
- [job](../wiki/Class:%20EnvoyPluginSDK#job)
- [jobId](../wiki/Class:%20EnvoyPluginSDK#jobid)
- [jwt](../wiki/Class:%20EnvoyPluginSDK#jwt)
- [meta](../wiki/Class:%20EnvoyPluginSDK#meta)
- [payload](../wiki/Class:%20EnvoyPluginSDK#payload)
- [pluginAPI](../wiki/Class:%20EnvoyPluginSDK#pluginapi)
- [userAPI](../wiki/Class:%20EnvoyPluginSDK#userapi)

## Constructors

### constructor

• **new EnvoyPluginSDK**<Meta, Payload\>(`body`, `isVerified?`, `pluginAccessToken?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta`: `EnvoyMeta` = `EnvoyMeta` |
| `Payload` | `Payload` = `unknown` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `body` | `EnvoyRequestBody`<Meta, Payload\> | `undefined` |
| `isVerified` | `boolean` | false |
| `pluginAccessToken` | ``null`` \| `string` | null |

#### Defined in

[EnvoyPluginSDK.ts:38](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L38)

## Accessors

### getJob

• `get` **getJob**(): (`jobId`: `string`) => [EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)

Returns a job based on an ID.

#### Returns

`fn`

▸ (`jobId`): [EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)

##### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

##### Returns

[EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)

#### Defined in

[EnvoyPluginSDK.ts:129](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L129)

___

### globalStorage

• `get` **globalStorage**(): [EnvoyPluginStorage](../wiki/Class:%20EnvoyPluginStorage)

Storage scoped globally (across installs).

#### Returns

[EnvoyPluginStorage](../wiki/Class:%20EnvoyPluginStorage)

#### Defined in

[EnvoyPluginSDK.ts:122](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L122)

___

### installStorage

• `get` **installStorage**(): [EnvoyPluginStorage](../wiki/Class:%20EnvoyPluginStorage)

Storage scoped to the install.

#### Returns

[EnvoyPluginStorage](../wiki/Class:%20EnvoyPluginStorage)

#### Defined in

[EnvoyPluginSDK.ts:111](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L111)

___

### job

• `get` **job**(): [EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)

Perform operations on the current job.

#### Returns

[EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)

#### Defined in

[EnvoyPluginSDK.ts:147](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L147)

___

### jobId

• `get` **jobId**(): ``null`` \| `string`

Returns the current job's ID.

#### Returns

``null`` \| `string`

#### Defined in

[EnvoyPluginSDK.ts:136](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L136)

___

### jwt

• `get` **jwt**(): [EnvoyJWT](../wiki/Class:%20EnvoyJWT)

A utility to encode and decode JWTs.
Useful for verifiable communications between plugin endpoints.

#### Returns

[EnvoyJWT](../wiki/Class:%20EnvoyJWT)

#### Defined in

[EnvoyPluginSDK.ts:160](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L160)

___

### meta

• `get` **meta**(): `Meta`

The metadata for the request.
Either an EnvoyEventMeta or EnvoyRouteMeta.

#### Returns

`Meta`

#### Defined in

[EnvoyPluginSDK.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L50)

___

### payload

• `get` **payload**(): `Payload`

The payload for the request.
For events, it's some Envoy resource, like an Entry or Invite.
For setup step validation URLs, it's the form submitted values for a validation URL.

#### Returns

`Payload`

#### Defined in

[EnvoyPluginSDK.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L62)

___

### pluginAPI

• `get` **pluginAPI**(): [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI)

Envoy API scoped to the plugin.
Used to perform storage or job operations.

#### Returns

[EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI)

#### Defined in

[EnvoyPluginSDK.ts:90](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L90)

___

### userAPI

• `get` **userAPI**(): [EnvoyUserAPI](../wiki/Class:%20EnvoyUserAPI)

Envoy API scoped to the user.
Used only in routes.

#### Returns

[EnvoyUserAPI](../wiki/Class:%20EnvoyUserAPI)

#### Defined in

[EnvoyPluginSDK.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyPluginSDK.ts#L73)
