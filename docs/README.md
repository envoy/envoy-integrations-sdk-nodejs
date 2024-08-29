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

### Handler Type aliases

- [EntryEventHandler](README.md#entryeventhandler)
- [InviteEventHandler](README.md#inviteeventhandler)
- [MigrationRouteHandler](README.md#migrationroutehandler)
- [OptionsRouteHandler](README.md#optionsroutehandler)
- [PluginUninstalledEventHandler](README.md#pluginuninstalledeventhandler)
- [RemoteValueRouteHandler](README.md#remotevalueroutehandler)
- [SelectedValuesRouteHandler](README.md#selectedvaluesroutehandler)
- [ValidationRouteHandler](README.md#validationroutehandler)

### Helper Type aliases

- [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions)

### Meta Type aliases

- [EnvoyEventMeta](README.md#envoyeventmeta)
- [EnvoyMetaAuth](README.md#envoymetaauth)
- [EnvoyMetaCompany](README.md#envoymetacompany)
- [EnvoyMetaJob](README.md#envoymetajob)
- [EnvoyMetaLocation](README.md#envoymetalocation)
- [EnvoyMetaZone](README.md#envoymetazone)
- [EnvoyRouteMeta](README.md#envoyroutemeta)

### Request Type aliases

- [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)
- [EnvoyEventRequest](README.md#envoyeventrequest)
- [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)
- [EnvoyMigrationRouteRequest](README.md#envoymigrationrouterequest)
- [EnvoyOptionsRouteRequest](README.md#envoyoptionsrouterequest)
- [EnvoyRemoteValueRouteRequest](README.md#envoyremotevaluerouterequest)
- [EnvoyRouteRequest](README.md#envoyrouterequest)
- [EnvoySelectedValuesRouteRequest](README.md#envoyselectedvaluesrouterequest)
- [EnvoyValidationRouteRequest](README.md#envoyvalidationrouterequest)

### Response Type aliases

- [EnvoyOptionsRouteResponse](README.md#envoyoptionsrouteresponse)
- [EnvoyRemoteValueRouteResponse](README.md#envoyremotevaluerouteresponse)
- [EnvoySelectedValuesRouteResponse](README.md#envoyselectedvaluesrouteresponse)

### Storage Type aliases

- [EnvoyStorageItem](README.md#envoystorageitem)

### Filter Functions

- [employeeSignInEnabledFilterMiddleware](README.md#employeesigninenabledfiltermiddleware)
- [excludedEmployeesFilterMiddleware](README.md#excludedemployeesfiltermiddleware)
- [inviteOnlyEntryFilterMiddleware](README.md#inviteonlyentryfiltermiddleware)

### Handler Functions

- [asyncHandler](README.md#asynchandler)
- [entryEventHandler](README.md#entryeventhandler)
- [inviteEventHandler](README.md#inviteeventhandler)
- [migrationRouteHandler](README.md#migrationroutehandler)
- [optionsRouteHandler](README.md#optionsroutehandler)
- [pluginUninstalledEventHandler](README.md#pluginuninstalledeventhandler)
- [remoteValueRouteHandler](README.md#remotevalueroutehandler)
- [selectedValuesRouteHandler](README.md#selectedvaluesroutehandler)
- [validationRouteHandler](README.md#validationroutehandler)

### Middleware Functions

- [employeeSignInEnabledFilterMiddleware](README.md#employeesigninenabledfiltermiddleware)
- [envoyMiddleware](README.md#envoymiddleware)
- [errorMiddleware](README.md#errormiddleware)
- [excludedEmployeesFilterMiddleware](README.md#excludedemployeesfiltermiddleware)
- [inviteOnlyEntryFilterMiddleware](README.md#inviteonlyentryfiltermiddleware)

## API Resource Type aliases

### AgreementModel

Ƭ **AgreementModel**: `JSONAPIModel`<[AgreementAttributes](interfaces/agreementattributes.md), [AgreementRelationships](README.md#agreementrelationships)\>

#### Defined in

[resources/AgreementResource.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/AgreementResource.ts#L26)

___

### AgreementPageAttributes

Ƭ **AgreementPageAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |
| `position?` | `number` |

#### Defined in

[resources/AgreementPageResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/AgreementPageResource.ts#L6)

___

### AgreementPageModel

Ƭ **AgreementPageModel**: `JSONAPIModel`<[AgreementPageAttributes](README.md#agreementpageattributes), [AgreementPageRelationships](README.md#agreementpagerelationships)\>

#### Defined in

[resources/AgreementPageResource.ts:19](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/AgreementPageResource.ts#L19)

___

### AgreementPageRelationships

Ƭ **AgreementPageRelationships**: ``"flow"`` \| ``"agreements"``

#### Defined in

[resources/AgreementPageResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/AgreementPageResource.ts#L14)

___

### AgreementRelationships

Ƭ **AgreementRelationships**: ``"agreement-page"``

#### Defined in

[resources/AgreementResource.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/AgreementResource.ts#L21)

___

### CompanyModel

Ƭ **CompanyModel**: `JSONAPIModel`<[CompanyAttributes](interfaces/companyattributes.md), [CompanyRelationships](README.md#companyrelationships)\>

#### Defined in

[resources/CompanyResource.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/CompanyResource.ts#L21)

___

### CompanyRelationships

Ƭ **CompanyRelationships**: ``"locations"``

#### Defined in

[resources/CompanyResource.ts:16](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/CompanyResource.ts#L16)

___

### EmployeeModel

Ƭ **EmployeeModel**: `JSONAPIModel`<[EmployeeAttributes](interfaces/employeeattributes.md), [EmployeeRelationships](README.md#employeerelationships)\>

#### Defined in

[resources/EmployeeResource.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/EmployeeResource.ts#L47)

___

### EmployeeRelationships

Ƭ **EmployeeRelationships**: ``"locations"`` \| ``"company"``

#### Defined in

[resources/EmployeeResource.ts:42](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/EmployeeResource.ts#L42)

___

### EmployeeSortFields

Ƭ **EmployeeSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/EmployeeResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/EmployeeResource.ts#L6)

___

### FlowModel

Ƭ **FlowModel**: `JSONAPIModel`<[FlowAttributes](interfaces/flowattributes.md), [FlowRelationships](README.md#flowrelationships)\>

#### Defined in

[resources/FlowResource.ts:35](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/FlowResource.ts#L35)

___

### FlowRelationships

Ƭ **FlowRelationships**: ``"location"`` \| ``"sign-in-field-page"`` \| ``"agreement-page"``

#### Defined in

[resources/FlowResource.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/FlowResource.ts#L30)

___

### FlowSortFields

Ƭ **FlowSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/FlowResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/FlowResource.ts#L6)

___

### InviteCreationModel

Ƭ **InviteCreationModel**: `JSONAPIModel`<[InviteCreationAttributes](interfaces/invitecreationattributes.md), [InviteRelationships](README.md#inviterelationships), ``"invites"``, undefined\>

#### Defined in

[resources/InviteResource.ts:92](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/InviteResource.ts#L92)

___

### InviteModel

Ƭ **InviteModel**: `JSONAPIModel`<[InviteAttributes](interfaces/inviteattributes.md), [InviteRelationships](README.md#inviterelationships), ``"invites"``\>

#### Defined in

[resources/InviteResource.ts:87](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/InviteResource.ts#L87)

___

### InviteRelationships

Ƭ **InviteRelationships**: ``"attendee"`` \| ``"creator"`` \| ``"employee"`` \| ``"entry"`` \| ``"flow"`` \| ``"location"``

#### Defined in

[resources/InviteResource.ts:82](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/InviteResource.ts#L82)

___

### InviteSortFields

Ƭ **InviteSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/InviteResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/InviteResource.ts#L6)

___

### LocationModel

Ƭ **LocationModel**: `JSONAPIModel`<[LocationAttributes](interfaces/locationattributes.md), [LocationRelationships](README.md#locationrelationships)\>

#### Defined in

[resources/LocationResource.ts:67](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/LocationResource.ts#L67)

___

### LocationRelationships

Ƭ **LocationRelationships**: ``"company"`` \| ``"employees"`` \| ``"flows"`` \| ``"employee-screening-flow"``

#### Defined in

[resources/LocationResource.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/LocationResource.ts#L62)

___

### LocationSortFields

Ƭ **LocationSortFields**: ``"name"`` \| ``"created_at"`` \| ``"-name"`` \| ``"-created_at"``

#### Defined in

[resources/LocationResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/LocationResource.ts#L6)

___

### SignInFieldModel

Ƭ **SignInFieldModel**: `JSONAPIModel`<[SignInFieldAttributes](interfaces/signinfieldattributes.md), [SignInFieldRelationships](README.md#signinfieldrelationships)\>

#### Defined in

[resources/SignInFieldResource.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/SignInFieldResource.ts#L31)

___

### SignInFieldPageAttributes

Ƭ **SignInFieldPageAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enabled?` | `boolean` |
| `position?` | `number` |

#### Defined in

[resources/SignInFieldPageResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/SignInFieldPageResource.ts#L6)

___

### SignInFieldPageModel

Ƭ **SignInFieldPageModel**: `JSONAPIModel`<[SignInFieldPageAttributes](README.md#signinfieldpageattributes), [SignInFieldPageRelationships](README.md#signinfieldpagerelationships)\>

#### Defined in

[resources/SignInFieldPageResource.ts:23](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/SignInFieldPageResource.ts#L23)

___

### SignInFieldPageRelationships

Ƭ **SignInFieldPageRelationships**: ``"flow"`` \| ``"actionable-sign-in-field-actions"`` \| ``"actionable-sign-in-fields"`` \| ``"sign-in-field-actions"`` \| ``"sign-in-fields"``

#### Defined in

[resources/SignInFieldPageResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/SignInFieldPageResource.ts#L14)

___

### SignInFieldRelationships

Ƭ **SignInFieldRelationships**: ``"sign-in-field-page"``

#### Defined in

[resources/SignInFieldResource.ts:26](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/SignInFieldResource.ts#L26)

___

### UserAttributes

Ƭ **UserAttributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email` | `string` |
| `name` | `string` |

#### Defined in

[resources/UserResource.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/UserResource.ts#L6)

___

### UserModel

Ƭ **UserModel**: `JSONAPIModel`<[UserAttributes](README.md#userattributes), ``""``\>

#### Defined in

[resources/UserResource.ts:14](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/resources/UserResource.ts#L14)

___

## Base Type aliases

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload, Config\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyRouteMeta](README.md#envoyroutemeta)<Config\> \| [EnvoyEventMeta](README.md#envoyeventmeta)<string, Config\>, Payload\>

You probably won't need to use this type directly.
For routes, use [EnvoyRouteRequest](README.md#envoyrouterequest),
and for events, use [EnvoyEntryEventRequest](README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:123](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L123)

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

[payloads/EntryPayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/payloads/EntryPayload.ts#L6)

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

[payloads/InvitePayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/payloads/InvitePayload.ts#L6)

___

## Handler Type aliases

### EntryEventHandler

Ƭ **EntryEventHandler**<Config, Additions\>: (`req`: [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)<Config\> & `Additions`, `res`: [EnvoyResponse](interfaces/envoyresponse.md)) => `Result`

Handle an entry event, such as `entry_sign_in`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyEntryEventRequest](README.md#envoyentryeventrequest)<Config\> & `Additions` |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L31)

___

### InviteEventHandler

Ƭ **InviteEventHandler**<Config, Additions\>: (`req`: [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)<Config\> & `Additions`, `res`: [EnvoyResponse](interfaces/envoyresponse.md)) => `Result`

Handle an invite event, such as `invite_created`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest)<Config\> & `Additions` |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:38](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L38)

___

### MigrationRouteHandler

Ƭ **MigrationRouteHandler**<OldConfig, NewConfig, Additions\>: (`req`: [EnvoyMigrationRouteRequest](README.md#envoymigrationrouterequest)<OldConfig\> & `Additions`, `res`: [EnvoyResponse](interfaces/envoyresponse.md)<NewConfig\>) => `Result`

Handle a "migration" route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OldConfig` | `OldConfig` = `SomeObject` |
| `NewConfig` | `NewConfig` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyMigrationRouteRequest](README.md#envoymigrationrouterequest)<OldConfig\> & `Additions` |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md)<NewConfig\> |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:52](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L52)

___

### OptionsRouteHandler

Ƭ **OptionsRouteHandler**<Config, Additions\>: (`req`: [EnvoyOptionsRouteRequest](README.md#envoyoptionsrouterequest)<Config\> & `Additions`, `res`: [EnvoyOptionsRouteResponse](README.md#envoyoptionsrouteresponse)) => `Result`

Handle an "options" route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyOptionsRouteRequest](README.md#envoyoptionsrouterequest)<Config\> & `Additions` |
| `res` | [EnvoyOptionsRouteResponse](README.md#envoyoptionsrouteresponse) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L59)

___

### PluginUninstalledEventHandler

Ƭ **PluginUninstalledEventHandler**<Config, Additions\>: (`req`: [EnvoyEventRequest](README.md#envoyeventrequest)<``"plugin_uninstalled"``, never, Config\> & `Additions`, `res`: [EnvoyResponse](interfaces/envoyresponse.md)) => `Result`

Handle a `plugin_uninstalled` event for cleaning up.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyEventRequest](README.md#envoyeventrequest)<``"plugin_uninstalled"``, never, Config\> & `Additions` |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L45)

___

### RemoteValueRouteHandler

Ƭ **RemoteValueRouteHandler**<Config, Additions\>: (`req`: [EnvoyRemoteValueRouteRequest](README.md#envoyremotevaluerouterequest)<Config\> & `Additions`, `res`: [EnvoyRemoteValueRouteResponse](README.md#envoyremotevaluerouteresponse)) => `Result`

Handle a "remote value" route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyRemoteValueRouteRequest](README.md#envoyremotevaluerouterequest)<Config\> & `Additions` |
| `res` | [EnvoyRemoteValueRouteResponse](README.md#envoyremotevaluerouteresponse) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:66](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L66)

___

### SelectedValuesRouteHandler

Ƭ **SelectedValuesRouteHandler**<Config, Additions\>: (`req`: [EnvoySelectedValuesRouteRequest](README.md#envoyselectedvaluesrouterequest)<Config\> & `Additions`, `res`: [EnvoySelectedValuesRouteResponse](README.md#envoyselectedvaluesrouteresponse)) => `Result`

Handle a "selected values" route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoySelectedValuesRouteRequest](README.md#envoyselectedvaluesrouterequest)<Config\> & `Additions` |
| `res` | [EnvoySelectedValuesRouteResponse](README.md#envoyselectedvaluesrouteresponse) |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L73)

___

### ValidationRouteHandler

Ƭ **ValidationRouteHandler**<Config, Payload, Additions\>: (`req`: [EnvoyValidationRouteRequest](README.md#envoyvalidationrouterequest)<Payload, Config\> & `Additions`, `res`: [EnvoyResponse](interfaces/envoyresponse.md)<Partial<Config\>\>) => `Result`

Handle a "validation" route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Payload` | `Payload` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Type declaration

▸ (`req`, `res`): `Result`

##### Parameters

| Name | Type |
| :------ | :------ |
| `req` | [EnvoyValidationRouteRequest](README.md#envoyvalidationrouterequest)<Payload, Config\> & `Additions` |
| `res` | [EnvoyResponse](interfaces/envoyresponse.md)<Partial<Config\>\> |

##### Returns

`Result`

#### Defined in

[sdk/handlers.ts:80](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L80)

___

## Helper Type aliases

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

[util/EnvoySignatureVerifier.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/util/EnvoySignatureVerifier.ts#L8)

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
| `zone` | [EnvoyMetaZone](README.md#envoymetazone) |
| `plugin_id` | `string` |

#### Defined in

[sdk/EnvoyMeta.ts:66](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L66)

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

[sdk/EnvoyMeta.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L53)

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

[sdk/EnvoyMeta.ts:37](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L37)

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

[sdk/EnvoyMeta.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L4)

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

[sdk/EnvoyMeta.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L13)

### EnvoyMetaZone

Ƭ **EnvoyMetaZone**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `attributes.address` | `string` \| ``null`` |
| `attributes.logo-url` | `string` \| ``null`` |
| `attributes.name` | `string` |
| `attributes.time-zone` | `string` |
| `id` | `string` |
| `type` | ``"zones"`` |

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
| `zone` | [EnvoyMetaZone](README.md#envoymetazone) |
| `params` | `Params` |
| `plugin_id` | `string` |
| `route` | `string` |

#### Defined in

[sdk/EnvoyMeta.ts:83](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyMeta.ts#L83)

___

## Request Type aliases

### EnvoyEntryEventRequest

Ƭ **EnvoyEntryEventRequest**<Config\>: [EnvoyEventRequest](README.md#envoyeventrequest)<EnvoyEntryEvent, [EntryPayload](README.md#entrypayload), Config\>

Use to type your `req` object in entry event handlers,
such as handlers for `entry_sign_in`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:104](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L104)

___

### EnvoyEventRequest

Ƭ **EnvoyEventRequest**<Event, Payload, Config\>: [EnvoyBaseRequest](interfaces/envoybaserequest.md)<[EnvoyEventMeta](README.md#envoyeventmeta)<Event, Config\>, Payload\>

Base type for event requests.
You should use [EnvoyEntryEventRequest](README.md#envoyentryeventrequest) or [EnvoyInviteEventRequest](README.md#envoyinviteeventrequest).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Event` | `Event`: `string` = `string` |
| `Payload` | `Payload` = `unknown` |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:95](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L95)

___

### EnvoyInviteEventRequest

Ƭ **EnvoyInviteEventRequest**<Config\>: [EnvoyEventRequest](README.md#envoyeventrequest)<EnvoyInviteEvent, [InvitePayload](README.md#invitepayload), Config\>

Use to type your `req` object in invite event handlers,
such as handlers for `invite_created` or `upcoming_visit`.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:113](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L113)

___

### EnvoyMigrationRouteRequest

Ƭ **EnvoyMigrationRouteRequest**<OldConfig\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<never, OldConfig, never\>

Use to type your `req` object in Envoy "migration" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OldConfig` | `OldConfig` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:54](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L54)

___

### EnvoyOptionsRouteRequest

Ƭ **EnvoyOptionsRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoyOptionsRouteResponseBody, Config, EnvoyOptionsRouteParams\>

Use to type your `req` object in Envoy "options URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:62](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L62)

___

### EnvoyRemoteValueRouteRequest

Ƭ **EnvoyRemoteValueRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoyRemoteValueRouteResponseBody, Config, never\>

Use to type your `req` object in Envoy "remote value URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L78)

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

[sdk/EnvoyRequest.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L43)

___

### EnvoySelectedValuesRouteRequest

Ƭ **EnvoySelectedValuesRouteRequest**<Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<EnvoySelectedValuesRouteResponseBody, Config, EnvoySelectedValuesRouteParams\>

Use to type your `req` object in Envoy "selected values URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:70](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L70)

___

### EnvoyValidationRouteRequest

Ƭ **EnvoyValidationRouteRequest**<Payload, Config\>: [EnvoyRouteRequest](README.md#envoyrouterequest)<Payload, Config, never\>

Use to type your `req` object in Envoy "validation URL" route handlers.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `Record`<string, unknown\> |
| `Config` | `Config` = `Record`<string, unknown\> |

#### Defined in

[sdk/EnvoyRequest.ts:86](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyRequest.ts#L86)

___

## Response Type aliases

### EnvoyOptionsRouteResponse

Ƭ **EnvoyOptionsRouteResponse**: [EnvoyResponse](interfaces/envoyresponse.md)<EnvoyOptionsRouteResponseBody\>

Use to type your `res` object in Envoy "options URL" route handlers.

#### Defined in

[sdk/EnvoyResponse.ts:34](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L34)

___

### EnvoyRemoteValueRouteResponse

Ƭ **EnvoyRemoteValueRouteResponse**: [EnvoyResponse](interfaces/envoyresponse.md)<EnvoyRemoteValueRouteResponseBody\>

Use to type your `res` object in Envoy "remote value URL" route handlers.

#### Defined in

[sdk/EnvoyResponse.ts:40](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L40)

___

### EnvoySelectedValuesRouteResponse

Ƭ **EnvoySelectedValuesRouteResponse**: [EnvoyResponse](interfaces/envoyresponse.md)<EnvoySelectedValuesRouteResponseBody\>

Use to type your `res` object in Envoy "selected values URL" route handlers.

#### Defined in

[sdk/EnvoyResponse.ts:46](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L46)

___

## Storage Type aliases

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**<Value\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Value` | `Value` = `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `Value` |

#### Defined in

[sdk/EnvoyStorageItem.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyStorageItem.ts#L4)

## Filter Functions

### employeeSignInEnabledFilterMiddleware

▸ **employeeSignInEnabledFilterMiddleware**<Config\>(`employeeSignInEnabledKey`, `message?`): `RequestHandler`

Will only proceed if the install's `config` has a truthy value for the given `employeeSignInEnabledKey`.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `employeeSignInEnabledKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Envoy Protect is disabled.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L30)

___

### excludedEmployeesFilterMiddleware

▸ **excludedEmployeesFilterMiddleware**<Config\>(`excludeEmployeesKey`, `message?`): `RequestHandler`

Will not proceed if the employee who's signing in is present in the excluded employees list.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `excludeEmployeesKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Employee excluded from integration.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L43)

___

### inviteOnlyEntryFilterMiddleware

▸ **inviteOnlyEntryFilterMiddleware**<Config\>(`invitesOnlyKey`, `message?`): `RequestHandler`

Will only proceed if the entry has an invite
and the install's `config` has a truthy value for the given `invitesOnlyKey`.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `invitesOnlyKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Visitors must be invited.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L78)

___

## Handler Functions

### asyncHandler

▸ **asyncHandler**<Req, Res\>(`handler`): `RequestHandler`

Wraps any express.js-based handlers
to catch Promise-based errors.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Req` | `Req`: `Request`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>, Req\> |
| `Res` | `Res`: `Response`<any, Record<string, any\>, Res\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | (`req`: `Req`, `res`: `Res`) => `Result` |

#### Returns

`RequestHandler`

#### Defined in

[sdk/handlers.ts:90](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L90)

___

### entryEventHandler

▸ **entryEventHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for entry events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [EntryEventHandler](README.md#entryeventhandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:103](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L103)

___

### inviteEventHandler

▸ **inviteEventHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for invite events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [InviteEventHandler](README.md#inviteeventhandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:115](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L115)

___

### migrationRouteHandler

▸ **migrationRouteHandler**<OldConfig, NewConfig, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for a migration route.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `OldConfig` | `OldConfig` |
| `NewConfig` | `NewConfig` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [MigrationRouteHandler](README.md#migrationroutehandler)<OldConfig, NewConfig, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:139](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L139)

___

### optionsRouteHandler

▸ **optionsRouteHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for options URL routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [OptionsRouteHandler](README.md#optionsroutehandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:152](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L152)

___

### pluginUninstalledEventHandler

▸ **pluginUninstalledEventHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for `plugin_uninstalled` events.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [PluginUninstalledEventHandler](README.md#pluginuninstalledeventhandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:127](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L127)

___

### remoteValueRouteHandler

▸ **remoteValueRouteHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for remote value URL routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [RemoteValueRouteHandler](README.md#remotevalueroutehandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:164](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L164)

___

### selectedValuesRouteHandler

▸ **selectedValuesRouteHandler**<Config, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for selected values URL routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [SelectedValuesRouteHandler](README.md#selectedvaluesroutehandler)<Config, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:176](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L176)

___

### validationRouteHandler

▸ **validationRouteHandler**<Config, Payload, Additions\>(`handler`): `RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

Handler for validation URL routes.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Config` | `Config` = `SomeObject` |
| `Payload` | `Payload` = `SomeObject` |
| `Additions` | `Additions` = `SomeObject` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `handler` | [ValidationRouteHandler](README.md#validationroutehandler)<Config, Payload, Additions\> |

#### Returns

`RequestHandler`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

#### Defined in

[sdk/handlers.ts:188](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/handlers.ts#L188)

___

## Middleware Functions

### employeeSignInEnabledFilterMiddleware

▸ **employeeSignInEnabledFilterMiddleware**<Config\>(`employeeSignInEnabledKey`, `message?`): `RequestHandler`

Will only proceed if the install's `config` has a truthy value for the given `employeeSignInEnabledKey`.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `employeeSignInEnabledKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Envoy Protect is disabled.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:30](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L30)

___

### envoyMiddleware

▸ **envoyMiddleware**(`options?`): `RequestHandler`

Sets up an [EnvoyPluginSDK](classes/envoypluginsdk.md) object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per [EnvoyResponse](interfaces/envoyresponse.md).

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [EnvoySignatureVerifierOptions](README.md#envoysignatureverifieroptions) |

#### Returns

`RequestHandler`

#### Defined in

[sdk/middleware.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/middleware.ts#L27)

___

### errorMiddleware

▸ **errorMiddleware**(`onError?`): `ErrorRequestHandler`

Catches errors and sets the proper status code.

#### Parameters

| Name | Type |
| :------ | :------ |
| `onError` | (`err`: `Error`) => `void` |

#### Returns

`ErrorRequestHandler`

#### Defined in

[sdk/middleware.ts:91](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/middleware.ts#L91)

___

### excludedEmployeesFilterMiddleware

▸ **excludedEmployeesFilterMiddleware**<Config\>(`excludeEmployeesKey`, `message?`): `RequestHandler`

Will not proceed if the employee who's signing in is present in the excluded employees list.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `excludeEmployeesKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Employee excluded from integration.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L43)

___

### inviteOnlyEntryFilterMiddleware

▸ **inviteOnlyEntryFilterMiddleware**<Config\>(`invitesOnlyKey`, `message?`): `RequestHandler`

Will only proceed if the entry has an invite
and the install's `config` has a truthy value for the given `invitesOnlyKey`.

#### Type parameters

| Name |
| :------ |
| `Config` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `invitesOnlyKey` | keyof `Config` | `undefined` |
| `message` | `string` | 'Visitors must be invited.' |

#### Returns

`RequestHandler`

#### Defined in

[sdk/filters.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/filters.ts#L78)
