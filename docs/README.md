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
- [EnvoyEventMeta](interfaces/envoyeventmeta.md)
- [EnvoyMetaCompany](interfaces/envoymetacompany.md)
- [EnvoyMetaJob](interfaces/envoymetajob.md)
- [EnvoyMetaLocation](interfaces/envoymetalocation.md)
- [EnvoyResponse](interfaces/envoyresponse.md)
- [EnvoyRouteMeta](interfaces/envoyroutemeta.md)
- [EnvoySignatureVerifierOptions](interfaces/envoysignatureverifieroptions.md)
- [VerifiedRequest](interfaces/verifiedrequest.md)

### Type aliases

- [EntryPayload](README.md#entrypayload)
- [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)
- [EnvoyEventRequest](README.md#envoyeventrequest)
- [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)
- [EnvoyMetaAuth](README.md#envoymetaauth)
- [EnvoyMiddleware](README.md#envoymiddleware)
- [EnvoyRequest](README.md#envoyrequest)
- [EnvoyRouteRequest](README.md#envoyrouterequest)
- [EnvoyStorageItem](README.md#envoystorageitem)
- [InvitePayload](README.md#invitepayload)

### Variables

- [VERIFIED](README.md#verified)

### Functions

- [asyncHandler](README.md#asynchandler)
- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## Type aliases

### EntryPayload

Ƭ **EntryPayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `attributes.email` | `string` \| ``null`` |
| `attributes.employee-screening-flow` | `boolean` |
| `attributes.flow-name` | `string` |
| `attributes.full-name` | `string` |
| `attributes.host` | `string` \| ``null`` |
| `attributes.host-email` | `string` \| ``null`` |
| `attributes.legal-docs?` | { `agreement`: { `id`: `string`  } ; `id`: `string` ; `signed-at`: `string` ; `url`: `string`  }[] |
| `attributes.nda?` | `string` |
| `attributes.phone-number?` | `string` |
| `attributes.private-notes` | `string` \| ``null`` |
| `attributes.signed-in-at` | `string` |
| `attributes.signed-out-at?` | `string` |
| `attributes.thumbnails` | `Object` |
| `attributes.thumbnails.large` | `string` \| ``null`` |
| `attributes.thumbnails.original` | `string` \| ``null`` |
| `attributes.thumbnails.small` | `string` \| ``null`` |
| `attributes.user-data` | { `field`: `string` ; `value`: `string` \| ``null``  }[] |
| `id` | `string` |
| `relationships` | `Object` |
| `relationships.agreeable-ndas?` | `Object` |
| `relationships.agreeable-ndas.data` | `JSONAPIData`<``"agreeable-ndas"``\>[] |
| `relationships.device?` | `Object` |
| `relationships.device.data` | `JSONAPIData`<``"devices"``\> |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | `JSONAPIData`<``"employees"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | `JSONAPIData`<``"flows"``\> |
| `relationships.invite?` | `Object` |
| `relationships.invite.data` | `JSONAPIData`<``"invites"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | `JSONAPIData`<``"locations"``\> |
| `relationships.visitor-entrance?` | `Object` |
| `relationships.visitor-entrance.data` | `JSONAPIData`<``"visitor-entrances"``\> |
| `type` | ``"entries"`` |

#### Defined in

[payloads/EntryPayload.ts:3](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/payloads/EntryPayload.ts#L3)

___

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<[EntryPayload](README.md#entrypayload)\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[EnvoyRequest.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L33)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyEventMeta](interfaces/envoyeventmeta.md), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L27)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<[InvitePayload](README.md#invitepayload)\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[EnvoyRequest.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L39)

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

[EnvoyMeta.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L43)

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

[middleware.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/middleware.ts#L12)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](interfaces/envoyroutemeta.md) \| [EnvoyEventMeta](interfaces/envoyeventmeta.md), Payload\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L41)

___

### EnvoyRouteRequest

Ƭ **EnvoyRouteRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](interfaces/envoyroutemeta.md), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L21)

___

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[EnvoyStorageItem.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyStorageItem.ts#L1)

___

### InvitePayload

Ƭ **InvitePayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `attributes.arrived` | `boolean` |
| `attributes.been-here-before` | `boolean` |
| `attributes.edit-token` | `string` |
| `attributes.email` | `string` \| ``null`` |
| `attributes.employee-screening-flow` | `boolean` |
| `attributes.expected-arrival-time` | `string` |
| `attributes.flow-id` | `string` |
| `attributes.flow-name` | `string` |
| `attributes.full-name` | `string` |
| `attributes.inviter-email` | `string` \| ``null`` |
| `attributes.inviter-name` | `string` \| ``null`` |
| `attributes.legal-docs?` | { `agreement`: { `id`: `string`  } ; `id`: `string` ; `signed-at`: `string` ; `url`: `string`  }[] |
| `attributes.nda?` | `string` |
| `attributes.photo-url` | `string` \| ``null`` |
| `attributes.preregistration-complete` | `boolean` |
| `attributes.private-notes` | `string` \| ``null`` |
| `attributes.qr-code` | `string` \| ``null`` |
| `attributes.qr-code-sent-at` | `string` \| ``null`` |
| `attributes.reminder-sent-at` | `string` \| ``null`` |
| `attributes.secret-token` | `string` |
| `attributes.signed-in-at?` | `string` |
| `attributes.signed-out-at?` | `string` |
| `attributes.user-data` | { `field`: `string` ; `value`: `string` \| ``null``  }[] |
| `id` | `string` |
| `relationships` | `Object` |
| `relationships.agreeable-ndas?` | `Object` |
| `relationships.agreeable-ndas.data` | `JSONAPIData`<``"agreeable-ndas"``\>[] |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | `JSONAPIData`<``"employees"``\> |
| `relationships.entry?` | `Object` |
| `relationships.entry.data` | `JSONAPIData`<``"entries"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | `JSONAPIData`<``"flows"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | `JSONAPIData`<``"locations"``\> |
| `type` | ``"invites"`` |

#### Defined in

[payloads/InvitePayload.ts:3](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/payloads/InvitePayload.ts#L3)

## Variables

### VERIFIED

• `Const` **VERIFIED**: typeof [VERIFIED](README.md#verified)

#### Defined in

[EnvoyRequest.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyRequest.ts#L7)

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

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/asyncHandler.ts#L10)

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

[errorMiddleware.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/errorMiddleware.ts#L9)

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
| `options?` | [EnvoySignatureVerifierOptions](interfaces/envoysignatureverifieroptions.md) |

#### Returns

[EnvoyMiddleware](README.md#envoymiddleware)

#### Defined in

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/middleware.ts#L21)
