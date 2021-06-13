[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginSDK

# Class: EnvoyPluginSDK<Meta, Payload\>

Sets up all relevant Envoy functions.
Attaches itself to every request object using our {@link middleware},
to allow for easy access to Envoy functions.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta` = `unknown` |
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

Don't create an instance of this class directly.

Instead, use {@link middleware} to automatically attach an instance to `req` on every request.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Meta` | `Meta` = `unknown` |
| `Payload` | `Payload` = `unknown` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `body` | `EnvoyRequestBody`<Meta, Payload\> | `undefined` | Request body |
| `isVerified` | `boolean` | false | If the request has been verified via {@link EnvoySignatureVerifier} |
| `pluginAccessToken` | ``null`` \| `string` | null | An access token from [EnvoyPluginAPI.loginAsPlugin](envoypluginapi.md#loginasplugin) |

#### Defined in

[sdk/EnvoyPluginSDK.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L41)

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

[sdk/EnvoyPluginSDK.ts:140](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L140)

___

### globalStorage

• `get` **globalStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped globally (across installs).

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:133](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L133)

___

### installStorage

• `get` **installStorage**(): [EnvoyPluginStorage](envoypluginstorage.md)

Storage scoped to the install.

#### Returns

[EnvoyPluginStorage](envoypluginstorage.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:122](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L122)

___

### job

• `get` **job**(): [EnvoyPluginJob](envoypluginjob.md)

Perform operations on the current job.

#### Returns

[EnvoyPluginJob](envoypluginjob.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:158](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L158)

___

### jobId

• `get` **jobId**(): ``null`` \| `string`

Returns the current job's ID.

#### Returns

``null`` \| `string`

#### Defined in

[sdk/EnvoyPluginSDK.ts:147](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L147)

___

### jwt

• `get` **jwt**(): [EnvoyJWT](envoyjwt.md)

A utility to encode and decode JWTs.
Useful for verifiable communications between plugin endpoints.

#### Returns

[EnvoyJWT](envoyjwt.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:171](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L171)

___

### meta

• `get` **meta**(): `Meta`

The metadata for the request.
Either an [EnvoyEventMeta](../README.md#envoyeventmeta)} or [EnvoyRouteMeta](../README.md#envoyroutemeta).

#### Returns

`Meta`

#### Defined in

[sdk/EnvoyPluginSDK.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L61)

___

### payload

• `get` **payload**(): `Payload`

The payload for the request.
For events, it's some Envoy event payload, like an [EntryPayload](../README.md#entrypayload) or [InvitePayload](../README.md#invitepayload).
For setup step validation URLs, it's the form submitted values for a validation URL.

#### Returns

`Payload`

#### Defined in

[sdk/EnvoyPluginSDK.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L73)

___

### pluginAPI

• `get` **pluginAPI**(): [EnvoyPluginAPI](envoypluginapi.md)

Envoy API scoped to the plugin.
Used to perform storage or job operations.

#### Returns

[EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:101](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L101)

___

### userAPI

• `get` **userAPI**(): [EnvoyUserAPI](envoyuserapi.md)

Envoy API scoped to the user.
Used only in routes.

#### Returns

[EnvoyUserAPI](envoyuserapi.md)

#### Defined in

[sdk/EnvoyPluginSDK.ts:84](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/883a970/src/sdk/EnvoyPluginSDK.ts#L84)
