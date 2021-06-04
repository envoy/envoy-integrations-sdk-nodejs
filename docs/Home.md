## Table of contents

### Enumerations

- [HttpStatus](../wiki/Enumeration:%20HttpStatus)

### Classes

- [EnvoyJWT](../wiki/Class:%20EnvoyJWT)
- [EnvoyPluginAPI](../wiki/Class:%20EnvoyPluginAPI)
- [EnvoyPluginJob](../wiki/Class:%20EnvoyPluginJob)
- [EnvoyPluginSDK](../wiki/Class:%20EnvoyPluginSDK)
- [EnvoyPluginStorage](../wiki/Class:%20EnvoyPluginStorage)
- [EnvoyPluginStoragePipeline](../wiki/Class:%20EnvoyPluginStoragePipeline)
- [EnvoySignatureVerifier](../wiki/Class:%20EnvoySignatureVerifier)
- [EnvoyUserAPI](../wiki/Class:%20EnvoyUserAPI)

### Interfaces

- [EnvoyBaseRequest](../wiki/Interface:%20EnvoyBaseRequest)
- [EnvoyResponse](../wiki/Interface:%20EnvoyResponse)
- [JSONAPIData](../wiki/Interface:%20JSONAPIData)
- [VerifiedRequest](../wiki/Interface:%20VerifiedRequest)

### Type aliases

- [EntryPayload](../wiki/Home#entrypayload)
- [EnvoyEntryEventRequest](../wiki/Home#envoyentryeventrequest)
- [EnvoyEventMeta](../wiki/Home#envoyeventmeta)
- [EnvoyEventRequest](../wiki/Home#envoyeventrequest)
- [EnvoyInviteEventRequest](../wiki/Home#envoyinviteeventrequest)
- [EnvoyMetaAuth](../wiki/Home#envoymetaauth)
- [EnvoyMetaCompany](../wiki/Home#envoymetacompany)
- [EnvoyMetaJob](../wiki/Home#envoymetajob)
- [EnvoyMetaLocation](../wiki/Home#envoymetalocation)
- [EnvoyMiddleware](../wiki/Home#envoymiddleware)
- [EnvoyRequest](../wiki/Home#envoyrequest)
- [EnvoyRouteMeta](../wiki/Home#envoyroutemeta)
- [EnvoyRouteRequest](../wiki/Home#envoyrouterequest)
- [EnvoySignatureVerifierOptions](../wiki/Home#envoysignatureverifieroptions)
- [EnvoyStorageItem](../wiki/Home#envoystorageitem)
- [InvitePayload](../wiki/Home#invitepayload)

### Variables

- [VERIFIED](../wiki/Home#verified)

### Functions

- [asyncHandler](../wiki/Home#asynchandler)
- [errorMiddleware](../wiki/Home#errormiddleware)
- [middleware](../wiki/Home#middleware)

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
| `relationships.agreeable-ndas.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"agreeable-ndas"``\>[] |
| `relationships.device?` | `Object` |
| `relationships.device.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"devices"``\> |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"employees"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"flows"``\> |
| `relationships.invite?` | `Object` |
| `relationships.invite.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"invites"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"locations"``\> |
| `relationships.visitor-entrance?` | `Object` |
| `relationships.visitor-entrance.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"visitor-entrances"``\> |
| `type` | ``"entries"`` |

#### Defined in

[payloads/EntryPayload.ts:3](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/payloads/EntryPayload.ts#L3)

___

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](../wiki/Home#envoyeventrequest)<[EntryPayload](../wiki/Home#entrypayload)\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[EnvoyRequest.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L39)

___

### EnvoyEventMeta

Ƭ **EnvoyEventMeta**: `Object`

Metadata that will be included in the request body for events.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](../wiki/Home#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](../wiki/Home#envoymetacompany) |
| `config` | `Record`<string, unknown\> |
| `event` | `string` |
| `install_id` | `string` |
| `job` | [EnvoyMetaJob](../wiki/Home#envoymetajob) |
| `location` | [EnvoyMetaLocation](../wiki/Home#envoymetalocation) |
| `plugin_id` | `string` |

#### Defined in

[EnvoyMeta.ts:54](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L54)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Payload\>: [EnvoyBaseRequest](../wiki/Interface:%20EnvoyBaseRequest)<[EnvoyEventMeta](../wiki/Home#envoyeventmeta), Payload\>

Base type for event requests.
You should use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L33)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](../wiki/Home#envoyeventrequest)<[InvitePayload](../wiki/Home#invitepayload)\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[EnvoyRequest.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L45)

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

[EnvoyMeta.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L43)

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

[EnvoyMeta.ts:28](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L28)

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

[EnvoyMeta.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L1)

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

[EnvoyMeta.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L7)

___

### EnvoyMiddleware

Ƭ **EnvoyMiddleware**: (`req`: [EnvoyRequest](../wiki/Home#envoyrequest), `res`: [EnvoyResponse](../wiki/Interface:%20EnvoyResponse), `next`: `NextFunction`) => `void`

#### Type declaration

▸ (`req`, `res`, `next`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyRequest](../wiki/Home#envoyrequest) |
| `res` | [EnvoyResponse](../wiki/Interface:%20EnvoyResponse) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[middleware.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/middleware.ts#L12)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: [EnvoyBaseRequest](../wiki/Interface:%20EnvoyBaseRequest)<[EnvoyRouteMeta](../wiki/Home#envoyroutemeta) \| [EnvoyEventMeta](../wiki/Home#envoyeventmeta), Payload\>

You probably won't need to use this type directly.
For routes, use `EnvoyRouteRequest`,
and for events, use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:52](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L52)

___

### EnvoyRouteMeta

Ƭ **EnvoyRouteMeta**: `Object`

Metadata that will be included in the request body for setup routes,
like validation URLs or options URLs.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](../wiki/Home#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](../wiki/Home#envoymetacompany) |
| `config` | `Record`<string, unknown\> |
| `forwarded_bearer_token?` | `string` |
| `install_id` | `string` |
| `location` | [EnvoyMetaLocation](../wiki/Home#envoymetalocation) |
| `params` | `Record`<string, unknown\> |
| `plugin_id` | `string` |
| `route` | `string` |

#### Defined in

[EnvoyMeta.ts:69](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyMeta.ts#L69)

___

### EnvoyRouteRequest

Ƭ **EnvoyRouteRequest**<Payload\>: [EnvoyBaseRequest](../wiki/Interface:%20EnvoyBaseRequest)<[EnvoyRouteMeta](../wiki/Home#envoyroutemeta), Payload\>

Use to type your `req` object in route handlers,
such as validation URLS or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L27)

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

[EnvoySignatureVerifier.ts:5](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoySignatureVerifier.ts#L5)

___

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[EnvoyStorageItem.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyStorageItem.ts#L1)

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
| `relationships.agreeable-ndas.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"agreeable-ndas"``\>[] |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"employees"``\> |
| `relationships.entry?` | `Object` |
| `relationships.entry.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"entries"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"flows"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | [JSONAPIData](../wiki/Interface:%20JSONAPIData)<``"locations"``\> |
| `type` | ``"invites"`` |

#### Defined in

[payloads/InvitePayload.ts:3](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/payloads/InvitePayload.ts#L3)

## Variables

### VERIFIED

• `Const` **VERIFIED**: typeof [VERIFIED](../wiki/Home#verified)

#### Defined in

[EnvoyRequest.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyRequest.ts#L7)

## Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: [EnvoyRequest](../wiki/Home#envoyrequest)<unknown\>, `res`: [EnvoyResponse](../wiki/Interface:%20EnvoyResponse), `next`: `NextFunction`) => `Promise`<void\>

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
| `req` | [EnvoyRequest](../wiki/Home#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](../wiki/Interface:%20EnvoyResponse) |
| `next` | `NextFunction` |

##### Returns

`Promise`<void\>

#### Defined in

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/asyncHandler.ts#L10)

___

### errorMiddleware

▸ **errorMiddleware**(`onError?`): (`err`: `Error`, `req`: [EnvoyRequest](../wiki/Home#envoyrequest)<unknown\>, `res`: [EnvoyResponse](../wiki/Interface:%20EnvoyResponse), `next`: `NextFunction`) => `void`

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
| `req` | [EnvoyRequest](../wiki/Home#envoyrequest)<unknown\> |
| `res` | [EnvoyResponse](../wiki/Interface:%20EnvoyResponse) |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[errorMiddleware.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/errorMiddleware.ts#L9)

___

### middleware

▸ **middleware**(`options?`): [EnvoyMiddleware](../wiki/Home#envoymiddleware)

Sets up an `EnvoyPluginSDK` object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per `EnvoyResponse`.

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [EnvoySignatureVerifierOptions](../wiki/Home#envoysignatureverifieroptions) |

#### Returns

[EnvoyMiddleware](../wiki/Home#envoymiddleware)

#### Defined in

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/middleware.ts#L21)
