@envoy/envoy-integrations-sdk

# @envoy/envoy-integrations-sdk

## Table of contents

### Enumerations

- [HttpStatus](enums/httpstatus.md)

### Classes

- [EnvoyJWT](classes/envoyjwt.md)
- [EnvoyPluginAPI](classes/envoypluginapi.md)
- [EnvoyPluginJob](classes/envoypluginjob.md)
- [EnvoyPluginSDK](classes/envoypluginsdk.md)
- [EnvoyPluginStorage](classes/envoypluginstorage.md)
- [EnvoyPluginStoragePipeline](classes/envoypluginstoragepipeline.md)
- [EnvoySignatureVerifier](classes/envoysignatureverifier.md)
- [EnvoyUserAPI](classes/envoyuserapi.md)

### Interfaces

- [EnvoyBaseRequest](interfaces/envoybaserequest.md)
- [EnvoyResponse](interfaces/envoyresponse.md)
- [VerifiedRequest](interfaces/verifiedrequest.md)

### Type aliases

- [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)
- [EnvoyEventMeta](README.md#envoyeventmeta)
- [EnvoyEventRequest](README.md#envoyeventrequest)
- [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)
- [EnvoyMetaAuth](README.md#envoymetaauth)
- [EnvoyMetaCompany](README.md#envoymetacompany)
- [EnvoyMetaJob](README.md#envoymetajob)
- [EnvoyMetaLocation](README.md#envoymetalocation)
- [EnvoyMiddleware](README.md#envoymiddleware)
- [EnvoyRequest](README.md#envoyrequest)
- [EnvoyRouteMeta](README.md#envoyroutemeta)
- [EnvoyRouteRequest](README.md#envoyrouterequest)
- [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions)
- [EnvoyStorageItem](README.md#envoystorageitem)

### Variables

- [VERIFIED](README.md#verified)

### Functions

- [asyncHandler](README.md#asynchandler)
- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## Type aliases

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<EntryPayload\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[EnvoyRequest.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L33)

___

### EnvoyEventMeta

Ƭ **EnvoyEventMeta**: `Object`

Metadata that will be included in the request body for events.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](README.md#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](README.md#envoymetacompany) |
| `config` | `Record`<string, unknown\> |
| `event` | `string` |
| `install_id` | `string` |
| `job` | [EnvoyMetaJob](README.md#envoymetajob) |
| `location` | [EnvoyMetaLocation](README.md#envoymetalocation) |
| `plugin_id` | `string` |

#### Defined in

[EnvoyMeta.ts:54](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L54)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyEventMeta](README.md#envoyeventmeta), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L27)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<InvitePayload\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[EnvoyRequest.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L39)

___

### EnvoyMetaAuth

Ƭ **EnvoyMetaAuth**: `Object`

A short-lived userAPI token.
Will be used to construct the userAPI property
found in req.envoy.userAPI.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access_token` | `string` |
| `expires_in` | `number` |
| `refresh_token` | `string` \| ``null`` |
| `refresh_token_expires_in` | `number` \| ``null`` |
| `token_type` | ``"Bearer"`` |

#### Defined in

[EnvoyMeta.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L43)

___

### EnvoyMetaCompany

Ƭ **EnvoyMetaCompany**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `attributes.active` | `boolean` |
| `attributes.created-at` | `string` |
| `attributes.name` | `string` |
| `id` | `string` |
| `type` | ``"companies"`` |

#### Defined in

[EnvoyMeta.ts:28](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L28)

___

### EnvoyMetaJob

Ƭ **EnvoyMetaJob**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `identifier` | `string` |
| `name` | `string` |

#### Defined in

[EnvoyMeta.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L1)

___

### EnvoyMetaLocation

Ƭ **EnvoyMetaLocation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `attributes.address` | `string` |
| `attributes.address-line-one` | `string` \| ``null`` |
| `attributes.address-line-two` | `string` \| ``null`` |
| `attributes.city` | `string` \| ``null`` |
| `attributes.company-name-override` | `string` \| ``null`` |
| `attributes.country` | `string` \| ``null`` |
| `attributes.created-at` | `string` |
| `attributes.latitude` | `number` \| ``null`` |
| `attributes.locale` | `string` \| ``null`` |
| `attributes.longitude` | `number` \| ``null`` |
| `attributes.name` | `string` |
| `attributes.state` | `string` \| ``null`` |
| `attributes.timezone` | `string` |
| `attributes.zip` | `string` \| ``null`` |
| `id` | `string` |
| `type` | ``"locations"`` |

#### Defined in

[EnvoyMeta.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L7)

___

### EnvoyMiddleware

Ƭ **EnvoyMiddleware**: (`req`: [EnvoyRequest](README.md#envoyrequest), `res`: [EnvoyResponse](interfaces/envoyresponse.md), `next`: `NextFunction`) => `void`

#### Type declaration

▸ (`req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyRequest](README.md#envoyrequest) |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[middleware.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/middleware.ts#L12)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](README.md#envoyroutemeta) \| [EnvoyEventMeta](README.md#envoyeventmeta), Payload\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L41)

___

### EnvoyRouteMeta

Ƭ **EnvoyRouteMeta**: `Object`

Metadata that will be included in the request body for setup routes,
like validation URLs or options URLs.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](README.md#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](README.md#envoymetacompany) |
| `config` | `Record`<string, unknown\> |
| `forwarded_bearer_token?` | `string` |
| `install_id` | `string` |
| `location` | [EnvoyMetaLocation](README.md#envoymetalocation) |
| `params` | `Record`<string, unknown\> |
| `plugin_id` | `string` |
| `route` | `string` |

#### Defined in

[EnvoyMeta.ts:69](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyMeta.ts#L69)

___

### EnvoyRouteRequest

Ƭ **EnvoyRouteRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](README.md#envoyroutemeta), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L21)

___

### EnvoySignatureVerifierOptions

Ƭ **EnvoySignatureVerifierOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `algorithm` | ``"sha256"`` \| `string` |
| `encoding` | `BinaryToTextEncoding` |
| `header` | ``"x-envoy-signature"`` \| `string` |
| `secret` | `string` |

#### Defined in

[EnvoySignatureVerifier.ts:5](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoySignatureVerifier.ts#L5)

___

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[EnvoyStorageItem.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyStorageItem.ts#L1)

## Variables

### VERIFIED

• `Const` **VERIFIED**: typeof [VERIFIED](README.md#verified)

#### Defined in

[EnvoyRequest.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/EnvoyRequest.ts#L7)

## Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: [EnvoyRequest](README.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](interfaces/envoyresponse.md), `next`: `NextFunction`) => `Promise`<void\>

Catches Promise-based errors.

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | `RequestHandler` \| `EnvoyHandler` |

#### Returns

`fn`

▸ (`req`, `res`, `next`): `Promise`<void\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyRequest](README.md#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`Promise`<void\>

#### Defined in

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/asyncHandler.ts#L10)

___

### errorMiddleware

▸ **errorMiddleware**(`onError?`): (`err`: `Error`, `req`: [EnvoyRequest](README.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](interfaces/envoyresponse.md), `next`: `NextFunction`) => `void`

Catches errors and sets the proper status code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError` | (`err`: `Error`) => `void` |

#### Returns

`fn`

▸ (`err`, `req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `req` | [EnvoyRequest](README.md#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[errorMiddleware.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/errorMiddleware.ts#L9)

___

### middleware

▸ **middleware**(`options?`): [EnvoyMiddleware](README.md#envoymiddleware)

Sets up an `EnvoyPluginSDK` object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per `EnvoyResponse`.

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions) |

#### Returns

[EnvoyMiddleware](README.md#envoymiddleware)

#### Defined in

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/af53dd2/src/middleware.ts#L21)