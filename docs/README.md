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

### API Resource Interfaces

- [AgreementAttributes](interfaces/agreementattributes.md)
- [CompanyAttributes](interfaces/companyattributes.md)
- [EmployeeAttributes](interfaces/employeeattributes.md)
- [EmployeeFilterFields](interfaces/employeefilterfields.md)
- [FlowAttributes](interfaces/flowattributes.md)
- [FlowFilterFields](interfaces/flowfilterfields.md)
- [InviteAttributes](interfaces/inviteattributes.md)
- [InviteCreationAttributes](interfaces/invitecreationattributes.md)
- [InviteFilterFields](interfaces/invitefilterfields.md)
- [LocationAttributes](interfaces/locationattributes.md)
- [LocationFilterFields](interfaces/locationfilterfields.md)
- [SignInFieldAttributes](interfaces/signinfieldattributes.md)

### Base Interfaces

- [EnvoyBaseRequest](interfaces/envoybaserequest.md)

### Other Interfaces

- [JSONAPIData](interfaces/jsonapidata.md)

### Response Interfaces

- [EnvoyResponse](interfaces/envoyresponse.md)

### API Resource Type aliases

- [AgreementModel](README.md#agreementmodel)
- [AgreementPageAttributes](README.md#agreementpageattributes)
- [AgreementPageModel](README.md#agreementpagemodel)
- [AgreementPageRelationships](README.md#agreementpagerelationships)
- [AgreementRelationships](README.md#agreementrelationships)
- [CompanyModel](README.md#companymodel)
- [CompanyRelationships](README.md#companyrelationships)
- [EmployeeModel](README.md#employeemodel)
- [EmployeeRelationships](README.md#employeerelationships)
- [EmployeeSortFields](README.md#employeesortfields)
- [FlowModel](README.md#flowmodel)
- [FlowRelationships](README.md#flowrelationships)
- [FlowSortFields](README.md#flowsortfields)
- [InviteCreationModel](README.md#invitecreationmodel)
- [InviteModel](README.md#invitemodel)
- [InviteRelationships](README.md#inviterelationships)
- [InviteSortFields](README.md#invitesortfields)
- [LocationModel](README.md#locationmodel)
- [LocationRelationships](README.md#locationrelationships)
- [LocationSortFields](README.md#locationsortfields)
- [SignInFieldModel](README.md#signinfieldmodel)
- [SignInFieldPageAttributes](README.md#signinfieldpageattributes)
- [SignInFieldPageModel](README.md#signinfieldpagemodel)
- [SignInFieldPageRelationships](README.md#signinfieldpagerelationships)
- [SignInFieldRelationships](README.md#signinfieldrelationships)
- [UserAttributes](README.md#userattributes)
- [UserModel](README.md#usermodel)

### Base Type aliases

- [EnvoyRequest](README.md#envoyrequest)

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
- [EnvoyOptionsRouteRequest](README.md#envoyoptionsrouterequest)
- [EnvoyRemoteValueRouteRequest](README.md#envoyremotevaluerouterequest)
- [EnvoyRouteRequest](README.md#envoyrouterequest)
- [EnvoySelectedValuesRouteRequest](README.md#envoyselectedvaluesrouterequest)

### Response Type aliases

- [EnvoyOptionsRouteResponse](README.md#envoyoptionsrouteresponse)
- [EnvoySelectedValuesRouteResponse](README.md#envoyselectedvaluesrouteresponse)

### Storage Type aliases

- [EnvoyStorageItem](README.md#envoystorageitem)

### Helper Functions

- [asyncHandler](README.md#asynchandler)

### SDK Functions

- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## API Resource Type aliases

### AgreementModel

Ƭ **AgreementModel**: `JSONAPIModel`<[AgreementAttributes](interfaces/agreementattributes.md), [AgreementRelationships](README.md#agreementrelationships)\>

#### Defined in

[resources/AgreementResource.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/AgreementResource.ts#L26)

___

### AgreementPageAttributes

Ƭ **AgreementPageAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |
| `position?` | `number` |

#### Defined in

[resources/AgreementPageResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/AgreementPageResource.ts#L6)

___

### AgreementPageModel

Ƭ **AgreementPageModel**: `JSONAPIModel`<[AgreementPageAttributes](README.md#agreementpageattributes), [AgreementPageRelationships](README.md#agreementpagerelationships)\>

#### Defined in

[resources/AgreementPageResource.ts:19](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/AgreementPageResource.ts#L19)

___

### AgreementPageRelationships

Ƭ **AgreementPageRelationships**: ``"flow"`` \| ``"agreements"``

#### Defined in

[resources/AgreementPageResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/AgreementPageResource.ts#L14)

___

### AgreementRelationships

Ƭ **AgreementRelationships**: ``"agreement-page"``

#### Defined in

[resources/AgreementResource.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/AgreementResource.ts#L21)

___

### CompanyModel

Ƭ **CompanyModel**: `JSONAPIModel`<[CompanyAttributes](interfaces/companyattributes.md), [CompanyRelationships](README.md#companyrelationships)\>

#### Defined in

[resources/CompanyResource.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/CompanyResource.ts#L21)

___

### CompanyRelationships

Ƭ **CompanyRelationships**: ``"locations"``

#### Defined in

[resources/CompanyResource.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/CompanyResource.ts#L16)

___

### EmployeeModel

Ƭ **EmployeeModel**: `JSONAPIModel`<[EmployeeAttributes](interfaces/employeeattributes.md), [EmployeeRelationships](README.md#employeerelationships)\>

#### Defined in

[resources/EmployeeResource.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/EmployeeResource.ts#L47)

___

### EmployeeRelationships

Ƭ **EmployeeRelationships**: ``"locations"`` \| ``"company"``

#### Defined in

[resources/EmployeeResource.ts:42](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/EmployeeResource.ts#L42)

___

### EmployeeSortFields

Ƭ **EmployeeSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/EmployeeResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/EmployeeResource.ts#L6)

___

### FlowModel

Ƭ **FlowModel**: `JSONAPIModel`<[FlowAttributes](interfaces/flowattributes.md), [FlowRelationships](README.md#flowrelationships)\>

#### Defined in

[resources/FlowResource.ts:35](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/FlowResource.ts#L35)

___

### FlowRelationships

Ƭ **FlowRelationships**: ``"location"`` \| ``"sign-in-field-page"`` \| ``"agreement-page"``

#### Defined in

[resources/FlowResource.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/FlowResource.ts#L30)

___

### FlowSortFields

Ƭ **FlowSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/FlowResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/FlowResource.ts#L6)

___

### InviteCreationModel

Ƭ **InviteCreationModel**: `JSONAPIModel`<[InviteCreationAttributes](interfaces/invitecreationattributes.md), [InviteRelationships](README.md#inviterelationships), ``"invites"``, undefined\>

#### Defined in

[resources/InviteResource.ts:92](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/InviteResource.ts#L92)

___

### InviteModel

Ƭ **InviteModel**: `JSONAPIModel`<[InviteAttributes](interfaces/inviteattributes.md), [InviteRelationships](README.md#inviterelationships), ``"invites"``\>

#### Defined in

[resources/InviteResource.ts:87](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/InviteResource.ts#L87)

___

### InviteRelationships

Ƭ **InviteRelationships**: ``"attendee"`` \| ``"creator"`` \| ``"employee"`` \| ``"entry"`` \| ``"flow"`` \| ``"location"``

#### Defined in

[resources/InviteResource.ts:82](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/InviteResource.ts#L82)

___

### InviteSortFields

Ƭ **InviteSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/InviteResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/InviteResource.ts#L6)

___

### LocationModel

Ƭ **LocationModel**: `JSONAPIModel`<[LocationAttributes](interfaces/locationattributes.md), [LocationRelationships](README.md#locationrelationships)\>

#### Defined in

[resources/LocationResource.ts:67](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/LocationResource.ts#L67)

___

### LocationRelationships

Ƭ **LocationRelationships**: ``"company"`` \| ``"employees"`` \| ``"flows"`` \| ``"employee-screening-flow"``

#### Defined in

[resources/LocationResource.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/LocationResource.ts#L62)

___

### LocationSortFields

Ƭ **LocationSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/LocationResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/LocationResource.ts#L6)

___

### SignInFieldModel

Ƭ **SignInFieldModel**: `JSONAPIModel`<[SignInFieldAttributes](interfaces/signinfieldattributes.md), [SignInFieldRelationships](README.md#signinfieldrelationships)\>

#### Defined in

[resources/SignInFieldResource.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/SignInFieldResource.ts#L31)

___

### SignInFieldPageAttributes

Ƭ **SignInFieldPageAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |
| `position?` | `number` |

#### Defined in

[resources/SignInFieldPageResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/SignInFieldPageResource.ts#L6)

___

### SignInFieldPageModel

Ƭ **SignInFieldPageModel**: `JSONAPIModel`<[SignInFieldPageAttributes](README.md#signinfieldpageattributes), [SignInFieldPageRelationships](README.md#signinfieldpagerelationships)\>

#### Defined in

[resources/SignInFieldPageResource.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/SignInFieldPageResource.ts#L23)

___

### SignInFieldPageRelationships

Ƭ **SignInFieldPageRelationships**: ``"flow"`` \| ``"actionable-sign-in-field-actions"`` \| ``"actionable-sign-in-fields"`` \| ``"sign-in-field-actions"`` \| ``"sign-in-fields"``

#### Defined in

[resources/SignInFieldPageResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/SignInFieldPageResource.ts#L14)

___

### SignInFieldRelationships

Ƭ **SignInFieldRelationships**: ``"sign-in-field-page"``

#### Defined in

[resources/SignInFieldResource.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/SignInFieldResource.ts#L26)

___

### UserAttributes

Ƭ **UserAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email` | `string` |
| `name` | `string` |

#### Defined in

[resources/UserResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/UserResource.ts#L6)

___

### UserModel

Ƭ **UserModel**: `JSONAPIModel`<[UserAttributes](README.md#userattributes), ``""``\>

#### Defined in

[resources/UserResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/resources/UserResource.ts#L14)

___

## Base Type aliases

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

[sdk/EnvoyRequest.ts:105](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L105)

___

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

[payloads/EntryPayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/payloads/EntryPayload.ts#L6)

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

[payloads/InvitePayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/payloads/InvitePayload.ts#L6)

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

[sdk/middleware.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/middleware.ts#L15)

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

[util/EnvoySignatureVerifier.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/util/EnvoySignatureVerifier.ts#L8)

___

## Meta Type aliases

### EnvoyEventMeta

Ƭ **EnvoyEventMeta**<Event, Config\>: `Object`

Metadata that will be included in the request body for events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | `Event`: `string` = `string` |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](README.md#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](README.md#envoymetacompany) |
| `config` | `Config` |
| `event` | `Event` |
| `install_id` | `string` |
| `job` | [EnvoyMetaJob](README.md#envoymetajob)<Event\> |
| `location` | [EnvoyMetaLocation](README.md#envoymetalocation) |
| `plugin_id` | `string` |

#### Defined in

[sdk/EnvoyMeta.ts:66](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L66)

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

[sdk/EnvoyMeta.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L53)

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

[sdk/EnvoyMeta.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L37)

___

### EnvoyMetaJob

Ƭ **EnvoyMetaJob**<Event\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | `Event`: `string` = `string` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `identifier` | `string` |
| `name` | `Event` |

#### Defined in

[sdk/EnvoyMeta.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L4)

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

[sdk/EnvoyMeta.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L13)

___

### EnvoyRouteMeta

Ƭ **EnvoyRouteMeta**<Config, Params\>: `Object`

Metadata that will be included in the request body for setup routes,
like validation URLs or options URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |
| `Params` | `Params` = `Record`<string, unknown\> |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | [EnvoyMetaAuth](README.md#envoymetaauth) \| ``null`` |
| `company` | [EnvoyMetaCompany](README.md#envoymetacompany) |
| `config` | `Config` |
| `forwarded_bearer_token?` | `string` |
| `install_id` | `string` |
| `location` | [EnvoyMetaLocation](README.md#envoymetalocation) |
| `params` | `Params` |
| `plugin_id` | `string` |
| `route` | `string` |

#### Defined in

[sdk/EnvoyMeta.ts:83](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyMeta.ts#L83)

___

## Request Type aliases

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<EnvoyEntryEvent, [EntryPayload](README.md#entrypayload)\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Defined in

[sdk/EnvoyRequest.ts:88](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L88)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Event, Payload\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyEventMeta](README.md#envoyeventmeta)<Event\>, Payload\>

Base type for event requests.
You should use [EnvoyEntryEventRequest](README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | `Event`: `string` = `string` |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[sdk/EnvoyRequest.ts:79](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L79)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**: [EnvoyEventRequest](README.md#envoyeventrequest)<EnvoyInviteEvent, [InvitePayload](README.md#invitepayload)\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Defined in

[sdk/EnvoyRequest.ts:96](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L96)

___

### EnvoyOptionsRouteRequest

Ƭ **EnvoyOptionsRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoyOptionsRouteResponseBody, Config, EnvoyOptionsRouteParams\>

Use to type your `req` object in Envoy "options URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:54](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L54)

___

### EnvoyRemoteValueRouteRequest

Ƭ **EnvoyRemoteValueRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoyRemoteValueRouteResponseBody, Config, never\>

Use to type your `req` object in Envoy "remote value URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:70](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L70)

___

### EnvoyRouteRequest

Ƭ **EnvoyRouteRequest**<Payload, Config, Params\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](README.md#envoyroutemeta)<Config, Params\>, Payload\>

Use to type your `req` object in Envoy route handlers such as validation URLs.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |
| `Config` | `Config` = `Record`<string, unknown\> |
| `Params` | `Params` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L43)

___

### EnvoySelectedValuesRouteRequest

Ƭ **EnvoySelectedValuesRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoySelectedValuesRouteResponseBody, Config, EnvoySelectedValuesRouteParams\>

Use to type your `req` object in Envoy "selected values URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyRequest.ts#L62)

___

## Response Type aliases

### EnvoyOptionsRouteResponse

Ƭ **EnvoyOptionsRouteResponse**: [EnvoyResponse](interfaces/envoyresponse.md)<EnvoyOptionsRouteResponseBody\>

Use to type your `res` object in Envoy "options URL" route handlers.

#### Defined in

[sdk/EnvoyResponse.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyResponse.ts#L33)

___

### EnvoySelectedValuesRouteResponse

Ƭ **EnvoySelectedValuesRouteResponse**: [EnvoyResponse](interfaces/envoyresponse.md)<EnvoySelectedValuesRouteResponseBody\>

Use to type your `res` object in Envoy "selected values URL" route handlers.

#### Defined in

[sdk/EnvoyResponse.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyResponse.ts#L39)

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

[sdk/EnvoyStorageItem.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/EnvoyStorageItem.ts#L4)

## Helper Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: [EnvoyRequest](README.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](interfaces/envoyresponse.md)<unknown\>, `next`: `NextFunction`) => `Promise`<void\>

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
| `res` | [EnvoyResponse](interfaces/envoyresponse.md)<unknown\> |
| `next` | `NextFunction` |

##### Returns

`Promise`<void\>

#### Defined in

[sdk/asyncHandler.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/asyncHandler.ts#L13)

___

## SDK Functions

### errorMiddleware

▸ **errorMiddleware**(`onError?`): (`err`: `Error`, `req`: [EnvoyRequest](README.md#envoyrequest)<unknown\>, `res`: [EnvoyResponse](interfaces/envoyresponse.md)<unknown\>, `next`: `NextFunction`) => `void`

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
| `res` | [EnvoyResponse](interfaces/envoyresponse.md)<unknown\> |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[sdk/errorMiddleware.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/errorMiddleware.ts#L11)

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

[sdk/middleware.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c0e2fd5/src/sdk/middleware.ts#L26)
