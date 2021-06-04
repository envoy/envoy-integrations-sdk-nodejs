[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginSDK

# Class: EnvoyPluginSDK<Meta, Payload\>

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

- [constructor](envoypluginsdk.md#constructor)

### Accessors

- [getJob](envoypluginsdk.md#getjob)
- [globalStorage](envoypluginsdk.md#globalstorage)
- [installStorage](envoypluginsdk.md#installstorage)
- [job](envoypluginsdk.md#job)
- [jobId](envoypluginsdk.md#jobid)
- [jwt](envoypluginsdk.md#jwt)
- [meta](envoypluginsdk.md#meta)
- [payload](envoypluginsdk.md#payload)
- [pluginAPI](envoypluginsdk.md#pluginapi)
- [userAPI](envoypluginsdk.md#userapi)

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

[src/EnvoyPluginSDK.ts:38](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L38)

## Accessors

### getJob

• `get` **getJob**(): (`jobId`: `string`) => [EnvoyPluginJob](envoypluginjob.md)

Returns a job based on an ID.

#### Returns

`fn`

▸ (`jobId`): [EnvoyPluginJob](envoypluginjob.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `jobId` | `string` |

##### Returns

[EnvoyPluginJob](envoypluginjob.md)

#### Defined in

[src/EnvoyPluginSDK.ts:129](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L129)

___

### globalStorage

• `get` **globalStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped globally (across installs).

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[src/EnvoyPluginSDK.ts:122](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L122)

___

### installStorage

• `get` **installStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped to the install.

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[src/EnvoyPluginSDK.ts:111](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L111)

___

### job

• `get` **job**(): [EnvoyPluginJob](envoypluginjob.md)

Perform operations on the current job.

#### Returns

[EnvoyPluginJob](envoypluginjob.md)

#### Defined in

[src/EnvoyPluginSDK.ts:147](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L147)

___

### jobId

• `get` **jobId**(): ``null`` \| `string`

Returns the current job's ID.

#### Returns

``null`` \| `string`

#### Defined in

[src/EnvoyPluginSDK.ts:136](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L136)

___

### jwt

• `get` **jwt**(): [EnvoyJWT](envoyjwt.md)

A utility to encode and decode JWTs.
Useful for verifiable communications between plugin endpoints.

#### Returns

[EnvoyJWT](envoyjwt.md)

#### Defined in

[src/EnvoyPluginSDK.ts:160](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L160)

___

### meta

• `get` **meta**(): `Meta`

The metadata for the request.
Either an EnvoyEventMeta or EnvoyRouteMeta.

#### Returns

`Meta`

#### Defined in

[src/EnvoyPluginSDK.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L50)

___

### payload

• `get` **payload**(): `Payload`

The payload for the request.
For events, it's some Envoy resource, like an Entry or Invite.
For setup step validation URLs, it's the form submitted values for a validation URL.

#### Returns

`Payload`

#### Defined in

[src/EnvoyPluginSDK.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L62)

___

### pluginAPI

• `get` **pluginAPI**(): [EnvoyPluginAPI](envoypluginapi.md)

Envoy API scoped to the plugin.
Used to perform storage or job operations.

#### Returns

[EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[src/EnvoyPluginSDK.ts:90](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L90)

___

### userAPI

• `get` **userAPI**(): [EnvoyUserAPI](envoyuserapi.md)

Envoy API scoped to the user.
Used only in routes.

#### Returns

[EnvoyUserAPI](envoyuserapi.md)

#### Defined in

[src/EnvoyPluginSDK.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyPluginSDK.ts#L73)
