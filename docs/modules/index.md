[@envoy/envoy-integrations-sdk](../README.md) / index

# Module: index

## Table of contents

### Enumerations

- [HttpStatus](../enums/index.httpstatus.md)

### Classes

- [EnvoyJWT](../classes/index.envoyjwt.md)
- [EnvoyPluginAPI](../classes/index.envoypluginapi.md)
- [EnvoyPluginJob](../classes/index.envoypluginjob.md)
- [EnvoyPluginSDK](../classes/index.envoypluginsdk.md)
- [EnvoyPluginStorage](../classes/index.envoypluginstorage.md)
- [EnvoyPluginStoragePipeline](../classes/index.envoypluginstoragepipeline.md)
- [EnvoySignatureVerifier](../classes/index.envoysignatureverifier.md)
- [EnvoyUserAPI](../classes/index.envoyuserapi.md)

### Interfaces

- [EnvoyBaseRequest](../interfaces/index.envoybaserequest.md)
- [EnvoyEventMeta](../interfaces/index.envoyeventmeta.md)
- [EnvoyMetaCompany](../interfaces/index.envoymetacompany.md)
- [EnvoyMetaJob](../interfaces/index.envoymetajob.md)
- [EnvoyMetaLocation](../interfaces/index.envoymetalocation.md)
- [EnvoyResponse](../interfaces/index.envoyresponse.md)
- [EnvoyRouteMeta](../interfaces/index.envoyroutemeta.md)
- [EnvoySignatureVerifierOptions](../interfaces/index.envoysignatureverifieroptions.md)
- [VerifiedRequest](../interfaces/index.verifiedrequest.md)

### Type aliases

- [EnvoyEntryEventRequest](index.md#envoyentryeventrequest)
- [EnvoyEventRequest](index.md#envoyeventrequest)
- [EnvoyInviteEventRequest](index.md#envoyinviteeventrequest)
- [EnvoyMetaAuth](index.md#envoymetaauth)
- [EnvoyMiddleware](index.md#envoymiddleware)
- [EnvoyRequest](index.md#envoyrequest)
- [EnvoyRouteRequest](index.md#envoyrouterequest)
- [EnvoyStorageItem](index.md#envoystorageitem)

### Variables

- [VERIFIED](index.md#verified)

### Functions

- [asyncHandler](index.md#asynchandler)
- [errorMiddleware](index.md#errormiddleware)
- [middleware](index.md#middleware)

## Type aliases

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](index.md#envoyeventrequest)<[default](../interfaces/payloads_entrypayload.default.md)\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[EnvoyRequest.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L33)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Payload\>: [EnvoyBaseRequest](../interfaces/index.envoybaserequest.md)<[EnvoyEventMeta](../interfaces/index.envoyeventmeta.md), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L27)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](index.md#envoyeventrequest)<[default](../interfaces/payloads_invitepayload.default.md)\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[EnvoyRequest.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L39)

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

[EnvoyMeta.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyMeta.ts#L43)

___

### EnvoyMiddleware

Ƭ **EnvoyMiddleware**: (`req`: [EnvoyRequest](index.md#envoyrequest), `res`: [EnvoyResponse](../interfaces/index.envoyresponse.md), `next`: `NextFunction`) => `void`

#### Type declaration

▸ (`req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyRequest](index.md#envoyrequest) |
| `res` | [EnvoyResponse](../interfaces/index.envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[middleware.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/middleware.ts#L12)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: [EnvoyBaseRequest](../interfaces/index.envoybaserequest.md)<[EnvoyRouteMeta](../interfaces/index.envoyroutemeta.md) \| [EnvoyEventMeta](../interfaces/index.envoyeventmeta.md), Payload\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L41)

___

### EnvoyRouteRequest

Ƭ **EnvoyRouteRequest**<Payload\>: [EnvoyBaseRequest](../interfaces/index.envoybaserequest.md)<[EnvoyRouteMeta](../interfaces/index.envoyroutemeta.md), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L21)

___

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[EnvoyStorageItem.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyStorageItem.ts#L1)

## Variables

### VERIFIED

• `Const` **VERIFIED**: typeof [VERIFIED](index.md#verified)

#### Defined in

[EnvoyRequest.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyRequest.ts#L7)

## Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: [EnvoyRequest](index.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](../interfaces/index.envoyresponse.md), `next`: `NextFunction`) => `Promise`<void\>

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
| `req` | [EnvoyRequest](index.md#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](../interfaces/index.envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`Promise`<void\>

#### Defined in

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/asyncHandler.ts#L10)

___

### errorMiddleware

▸ **errorMiddleware**(`onError?`): (`err`: `Error`, `req`: [EnvoyRequest](index.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](../interfaces/index.envoyresponse.md), `next`: `NextFunction`) => `void`

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
| `req` | [EnvoyRequest](index.md#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](../interfaces/index.envoyresponse.md) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[errorMiddleware.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/errorMiddleware.ts#L9)

___

### middleware

▸ **middleware**(`options?`): [EnvoyMiddleware](index.md#envoymiddleware)

Sets up an `EnvoyPluginSDK` object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per `EnvoyResponse`.

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [EnvoySignatureVerifierOptions](../interfaces/index.envoysignatureverifieroptions.md) |

#### Returns

[EnvoyMiddleware](index.md#envoymiddleware)

#### Defined in

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/middleware.ts#L21)
