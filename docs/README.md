@envoy/envoy-integrations-sdk

# @envoy/envoy-integrations-sdk

## Table of contents

### API Classes

- [EnvoyPluginAPI](classes/envoypluginapi.md)
- [EnvoyUserAPI](classes/envoyuserapi.md)

### Helper Classes

- [EnvoyJWT](classes/envoyjwt.md)

### Request Object Classes

- [EnvoyJWT](classes/envoyjwt.md)
- [EnvoyPluginAPI](classes/envoypluginapi.md)
- [EnvoyPluginJob](classes/envoypluginjob.md)
- [EnvoyPluginStorage](classes/envoypluginstorage.md)
- [EnvoyUserAPI](classes/envoyuserapi.md)

### SDK Classes

- [EnvoyPluginSDK](classes/envoypluginsdk.md)

### Storage Classes

- [EnvoyPluginStorage](classes/envoypluginstorage.md)

### Other Interfaces

- [JSONAPIData](interfaces/jsonapidata.md)

### Request Interfaces

- [EnvoyBaseRequest](interfaces/envoybaserequest.md)

### Response Interfaces

- [EnvoyResponse](interfaces/envoyresponse.md)

### Event Type aliases

- [EntryPayload](README.md#entrypayload)
- [InvitePayload](README.md#invitepayload)

### Helper Type aliases

- [EnvoyMiddleware](README.md#envoymiddleware)
- [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions)

### Meta Type aliases

- [EnvoyEventMeta](README.md#envoyeventmeta)
- [EnvoyMetaAuth](README.md#envoymetaauth)
- [EnvoyMetaCompany](README.md#envoymetacompany)
- [EnvoyMetaJob](README.md#envoymetajob)
- [EnvoyMetaLocation](README.md#envoymetalocation)
- [EnvoyRouteMeta](README.md#envoyroutemeta)

### Request Type aliases

- [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)
- [EnvoyEventRequest](README.md#envoyeventrequest)
- [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)
- [EnvoyRequest](README.md#envoyrequest)
- [EnvoyRouteRequest](README.md#envoyrouterequest)

### Storage Type aliases

- [EnvoyStorageItem](README.md#envoystorageitem)

### Helper Functions

- [asyncHandler](README.md#asynchandler)

### SDK Functions

- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## Event Type aliases

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
| `relationships.agreeable-ndas.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"agreeable-ndas"``\>[] |
| `relationships.device?` | `Object` |
| `relationships.device.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"devices"``\> |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"employees"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"flows"``\> |
| `relationships.invite?` | `Object` |
| `relationships.invite.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"invites"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"locations"``\> |
| `relationships.visitor-entrance?` | `Object` |
| `relationships.visitor-entrance.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"visitor-entrances"``\> |
| `type` | ``"entries"`` |

#### Defined in

[payloads/EntryPayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/payloads/EntryPayload.ts#L6)

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
| `relationships.agreeable-ndas.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"agreeable-ndas"``\>[] |
| `relationships.employee?` | `Object` |
| `relationships.employee.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"employees"``\> |
| `relationships.entry?` | `Object` |
| `relationships.entry.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"entries"``\> |
| `relationships.flow?` | `Object` |
| `relationships.flow.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"flows"``\> |
| `relationships.location` | `Object` |
| `relationships.location.data` | [JSONAPIData](interfaces/jsonapidata.md)<``"locations"``\> |
| `type` | ``"invites"`` |

#### Defined in

[payloads/InvitePayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/payloads/InvitePayload.ts#L6)

___

## Helper Type aliases

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

[sdk/middleware.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/middleware.ts#L15)

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

[util/EnvoySignatureVerifier.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/util/EnvoySignatureVerifier.ts#L8)

___

## Meta Type aliases

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

[sdk/EnvoyMeta.ts:66](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L66)

___

### EnvoyMetaAuth

Ƭ **EnvoyMetaAuth**: `Object`

A short-lived `userAPI` token.
Will be used to construct the `userAPI` property found in `req.envoy.userAPI`.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access_token` | `string` |
| `expires_in` | `number` |
| `refresh_token` | `string` \| ``null`` |
| `refresh_token_expires_in` | `number` \| ``null`` |
| `token_type` | ``"Bearer"`` |

#### Defined in

[sdk/EnvoyMeta.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L53)

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

[sdk/EnvoyMeta.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L37)

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

[sdk/EnvoyMeta.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L4)

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

[sdk/EnvoyMeta.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L13)

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

[sdk/EnvoyMeta.ts:83](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyMeta.ts#L83)

___

## Request Type aliases

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<[EntryPayload](README.md#entrypayload)\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[sdk/EnvoyRequest.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyRequest.ts#L53)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyEventMeta](README.md#envoyeventmeta), Payload\>

Base type for event requests.
You should use [EnvoyEntryEventRequest](README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[sdk/EnvoyRequest.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyRequest.ts#L45)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<[InvitePayload](README.md#invitepayload)\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[sdk/EnvoyRequest.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyRequest.ts#L61)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](README.md#envoyroutemeta) \| [EnvoyEventMeta](README.md#envoyeventmeta), Payload\>

You probably won't need to use this type directly.
For routes, use [EnvoyRouteRequest](README.md#envoyrouterequest),
and for events, use [EnvoyEntryEventRequest](README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[sdk/EnvoyRequest.ts:70](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyRequest.ts#L70)

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

[sdk/EnvoyRequest.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyRequest.ts#L37)

___

## Storage Type aliases

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[sdk/EnvoyStorageItem.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyStorageItem.ts#L4)

## Helper Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: [EnvoyRequest](README.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](interfaces/envoyresponse.md), `next`: `NextFunction`) => `Promise`<void\>

Wraps any express.js-based handlers
to catch Promise-based errors.

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

[sdk/asyncHandler.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/asyncHandler.ts#L13)

___

## SDK Functions

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

[sdk/errorMiddleware.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/errorMiddleware.ts#L11)

___

### middleware

▸ **middleware**(`options?`): [EnvoyMiddleware](README.md#envoymiddleware)

Sets up an [EnvoyPluginSDK](classes/envoypluginsdk.md) object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per [EnvoyResponse](interfaces/envoyresponse.md).

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions) |

#### Returns

[EnvoyMiddleware](README.md#envoymiddleware)

#### Defined in

[sdk/middleware.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/middleware.ts#L26)
