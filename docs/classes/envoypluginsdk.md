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

[EnvoyPluginSDK.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L41)

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

[EnvoyPluginSDK.ts:132](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L132)

___

### globalStorage

• `get` **globalStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped globally (across installs).

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[EnvoyPluginSDK.ts:125](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L125)

___

### installStorage

• `get` **installStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped to the install.

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[EnvoyPluginSDK.ts:114](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L114)

___

### job

• `get` **job**(): [EnvoyPluginJob](envoypluginjob.md)

Perform operations on the current job.

#### Returns

[EnvoyPluginJob](envoypluginjob.md)

#### Defined in

[EnvoyPluginSDK.ts:150](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L150)

___

### jobId

• `get` **jobId**(): ``null`` \| `string`

Returns the current job's ID.

#### Returns

``null`` \| `string`

#### Defined in

[EnvoyPluginSDK.ts:139](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L139)

___

### jwt

• `get` **jwt**(): [EnvoyJWT](envoyjwt.md)

A utility to encode and decode JWTs.
Useful for verifiable communications between plugin endpoints.

#### Returns

[EnvoyJWT](envoyjwt.md)

#### Defined in

[EnvoyPluginSDK.ts:163](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L163)

___

### meta

• `get` **meta**(): `Meta`

The metadata for the request.
Either an EnvoyEventMeta or EnvoyRouteMeta.

#### Returns

`Meta`

#### Defined in

[EnvoyPluginSDK.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L53)

___

### payload

• `get` **payload**(): `Payload`

The payload for the request.
For events, it's some Envoy resource, like an Entry or Invite.
For setup step validation URLs, it's the form submitted values for a validation URL.

#### Returns

`Payload`

#### Defined in

[EnvoyPluginSDK.ts:65](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L65)

___

### pluginAPI

• `get` **pluginAPI**(): [EnvoyPluginAPI](envoypluginapi.md)

Envoy API scoped to the plugin.
Used to perform storage or job operations.

#### Returns

[EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[EnvoyPluginSDK.ts:93](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L93)

___

### userAPI

• `get` **userAPI**(): [EnvoyUserAPI](envoyuserapi.md)

Envoy API scoped to the user.
Used only in routes.

#### Returns

[EnvoyUserAPI](envoyuserapi.md)

#### Defined in

[EnvoyPluginSDK.ts:76](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/cd208f9/src/EnvoyPluginSDK.ts#L76)
