[@envoy/envoy-integrations-sdk](../README.md) / [index](../modules/index.md) / EnvoyPluginSDK

# Class: EnvoyPluginSDK<Meta, Payload\>

[index](../modules/index.md).EnvoyPluginSDK

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

- [constructor](index.envoypluginsdk.md#constructor)

### Accessors

- [getJob](index.envoypluginsdk.md#getjob)
- [globalStorage](index.envoypluginsdk.md#globalstorage)
- [installStorage](index.envoypluginsdk.md#installstorage)
- [job](index.envoypluginsdk.md#job)
- [jobId](index.envoypluginsdk.md#jobid)
- [jwt](index.envoypluginsdk.md#jwt)
- [meta](index.envoypluginsdk.md#meta)
- [payload](index.envoypluginsdk.md#payload)
- [pluginAPI](index.envoypluginsdk.md#pluginapi)
- [userAPI](index.envoypluginsdk.md#userapi)

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

[EnvoyPluginSDK.ts:38](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L38)

## Accessors

### getJob

• `get` **getJob**(): (`jobId`: `string`) => [EnvoyPluginJob](index.envoypluginjob.md)

Returns a job based on an ID.

#### Returns

`fn`

▸ (`jobId`): [EnvoyPluginJob](index.envoypluginjob.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

##### Returns

[EnvoyPluginJob](index.envoypluginjob.md)

#### Defined in

[EnvoyPluginSDK.ts:129](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L129)

___

### globalStorage

• `get` **globalStorage**(): [EnvoyPluginStorage](index.envoypluginstorage.md)

Storage scoped globally (across installs).

#### Returns

[EnvoyPluginStorage](index.envoypluginstorage.md)

#### Defined in

[EnvoyPluginSDK.ts:122](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L122)

___

### installStorage

• `get` **installStorage**(): [EnvoyPluginStorage](index.envoypluginstorage.md)

Storage scoped to the install.

#### Returns

[EnvoyPluginStorage](index.envoypluginstorage.md)

#### Defined in

[EnvoyPluginSDK.ts:111](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L111)

___

### job

• `get` **job**(): [EnvoyPluginJob](index.envoypluginjob.md)

Perform operations on the current job.

#### Returns

[EnvoyPluginJob](index.envoypluginjob.md)

#### Defined in

[EnvoyPluginSDK.ts:147](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L147)

___

### jobId

• `get` **jobId**(): ``null`` \| `string`

Returns the current job's ID.

#### Returns

``null`` \| `string`

#### Defined in

[EnvoyPluginSDK.ts:136](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L136)

___

### jwt

• `get` **jwt**(): [EnvoyJWT](index.envoyjwt.md)

A utility to encode and decode JWTs.
Useful for verifiable communications between plugin endpoints.

#### Returns

[EnvoyJWT](index.envoyjwt.md)

#### Defined in

[EnvoyPluginSDK.ts:160](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L160)

___

### meta

• `get` **meta**(): `Meta`

The metadata for the request.
Either an EnvoyEventMeta or EnvoyRouteMeta.

#### Returns

`Meta`

#### Defined in

[EnvoyPluginSDK.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L50)

___

### payload

• `get` **payload**(): `Payload`

The payload for the request.
For events, it's some Envoy resource, like an Entry or Invite.
For setup step validation URLs, it's the form submitted values for a validation URL.

#### Returns

`Payload`

#### Defined in

[EnvoyPluginSDK.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L62)

___

### pluginAPI

• `get` **pluginAPI**(): [EnvoyPluginAPI](index.envoypluginapi.md)

Envoy API scoped to the plugin.
Used to perform storage or job operations.

#### Returns

[EnvoyPluginAPI](index.envoypluginapi.md)

#### Defined in

[EnvoyPluginSDK.ts:90](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L90)

___

### userAPI

• `get` **userAPI**(): [EnvoyUserAPI](index.envoyuserapi.md)

Envoy API scoped to the user.
Used only in routes.

#### Returns

[EnvoyUserAPI](index.envoyuserapi.md)

#### Defined in

[EnvoyPluginSDK.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyPluginSDK.ts#L73)
