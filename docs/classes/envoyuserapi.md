[@envoy/envoy-integrations-sdk](../README.md) / EnvoyUserAPI

# Class: EnvoyUserAPI

API endpoints for *user-scoped* tokens.
To access Envoy resources, this is the API you'd want.

## Hierarchy

- `EnvoyAPI`

  ↳ **EnvoyUserAPI**

## Table of contents

### Constructors

- [constructor](envoyuserapi.md#constructor)

### Properties

- [axios](envoyuserapi.md#axios)

### Methods

- [createInvite](envoyuserapi.md#createinvite)
- [getAgreement](envoyuserapi.md#getagreement)
- [getAgreementPage](envoyuserapi.md#getagreementpage)
- [getCompany](envoyuserapi.md#getcompany)
- [getEmployee](envoyuserapi.md#getemployee)
- [getEmployeeByEmail](envoyuserapi.md#getemployeebyemail)
- [getEmployees](envoyuserapi.md#getemployees)
- [getFlow](envoyuserapi.md#getflow)
- [getFlows](envoyuserapi.md#getflows)
- [getInvites](envoyuserapi.md#getinvites)
- [getLocation](envoyuserapi.md#getlocation)
- [getLocations](envoyuserapi.md#getlocations)
- [getSignInField](envoyuserapi.md#getsigninfield)
- [getSignInFieldPage](envoyuserapi.md#getsigninfieldpage)
- [getSignInFields](envoyuserapi.md#getsigninfields)
- [me](envoyuserapi.md#me)
- [partialUpdateInvite](envoyuserapi.md#partialupdateinvite)
- [removeInvite](envoyuserapi.md#removeinvite)
- [updateInvite](envoyuserapi.md#updateinvite)
- [getAuthorizeURL](envoyuserapi.md#getauthorizeurl)
- [loginAsPluginInstaller](envoyuserapi.md#loginasplugininstaller)
- [loginAsUserWithCode](envoyuserapi.md#loginasuserwithcode)
- [loginAsUserWithPassword](envoyuserapi.md#loginasuserwithpassword)

## Constructors

### constructor

• **new EnvoyUserAPI**(`accessToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |

#### Inherited from

EnvoyAPI.constructor

#### Defined in

[base/EnvoyAPI.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/base/EnvoyAPI.ts#L59)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[base/EnvoyAPI.ts:32](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/base/EnvoyAPI.ts#L32)

## Methods

### createInvite

▸ **createInvite**(`invite`): `Promise`<InviteModel\>

Requires `invites.write` scope.
May also require `invites.attest` scope if setting `attested: true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:188](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L188)

___

### getAgreement

▸ **getAgreement**(`id`, `include?`): `Promise`<AgreementModel\>

Requires `agreements.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<AgreementModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:65](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L65)

___

### getAgreementPage

▸ **getAgreementPage**(`id`, `include?`): `Promise`<AgreementPageModel\>

{@link AgreementPageModel}

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<AgreementPageModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L58)

___

### getCompany

▸ **getCompany**(`id`, `include?`): `Promise`<CompanyModel\>

Requires `companies.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<CompanyModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:72](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L72)

___

### getEmployee

▸ **getEmployee**(`id`, `include?`): `Promise`<EmployeeModel\>

Requires `employees.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<EmployeeModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:79](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L79)

___

### getEmployeeByEmail

▸ **getEmployeeByEmail**(`email`, `include?`): `Promise`<EmployeeModel\>

Requires `employees.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `email` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<EmployeeModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:114](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L114)

___

### getEmployees

▸ **getEmployees**(`params?`): `Promise`<EmployeeModel[]\>

Requires `employees.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<EmployeeFilterFields, EmployeeSortFields\> |

#### Returns

`Promise`<EmployeeModel[]\>

#### Defined in

[sdk/EnvoyUserAPI.ts:136](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L136)

___

### getFlow

▸ **getFlow**(`id`, `include?`): `Promise`<FlowModel\>

Requires `flows.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<FlowModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:86](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L86)

___

### getFlows

▸ **getFlows**(`params?`): `Promise`<FlowModel[]\>

Requires `flows.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<FlowFilterFields, FlowSortFields\> |

#### Returns

`Promise`<FlowModel[]\>

#### Defined in

[sdk/EnvoyUserAPI.ts:146](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L146)

___

### getInvites

▸ **getInvites**(`params?`): `Promise`<InviteModel[]\>

Requires `invites.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<InviteFilterFields, InviteSortFields\> |

#### Returns

`Promise`<InviteModel[]\>

#### Defined in

[sdk/EnvoyUserAPI.ts:172](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L172)

___

### getLocation

▸ **getLocation**(`id`, `include?`): `Promise`<LocationModel\>

Requires `locations.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<LocationModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:93](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L93)

___

### getLocations

▸ **getLocations**(`params?`): `Promise`<LocationModel[]\>

Requires `locations.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<LocationFilterFields, LocationSortFields\> |

#### Returns

`Promise`<LocationModel[]\>

#### Defined in

[sdk/EnvoyUserAPI.ts:154](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L154)

___

### getSignInField

▸ **getSignInField**(`id`, `include?`): `Promise`<SignInFieldModel\>

Requires `sign-in-fields.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<SignInFieldModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:107](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L107)

___

### getSignInFieldPage

▸ **getSignInFieldPage**(`id`, `include?`): `Promise`<SignInFieldPageModel\>

Requires `sign-in-field-pages.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<SignInFieldPageModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:100](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L100)

___

### getSignInFields

▸ **getSignInFields**(`signInFieldPageId`): `Promise`<SignInFieldModel[]\>

Requires `sign-in-fields.read` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `signInFieldPageId` | `string` |

#### Returns

`Promise`<SignInFieldModel[]\>

#### Defined in

[sdk/EnvoyUserAPI.ts:164](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L164)

___

### me

▸ **me**(): `Promise`<UserModel\>

#### Returns

`Promise`<UserModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:179](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L179)

___

### partialUpdateInvite

▸ **partialUpdateInvite**(`inviteId`, `invite`): `Promise`<InviteModel\>

Requires `invites.write` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:213](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L213)

___

### removeInvite

▸ **removeInvite**(`inviteId`): `Promise`<void\>

Requires `invites.write` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyUserAPI.ts:226](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L226)

___

### updateInvite

▸ **updateInvite**(`inviteId`, `invite`): `Promise`<InviteModel\>

Requires `invites.write` scope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:200](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L200)

___

### getAuthorizeURL

▸ `Static` **getAuthorizeURL**(`redirectURL`, `scope`, `clientId?`): `string`

Builds the authorize URL to redirect a user to initiate the auth code oauth2 flow.

Upon completion, they will be redirected to `redirectURL`, with a `code` query param in the url.

Use the [loginAsUserWithCode](envoyuserapi.md#loginasuserwithcode) method to exchange that code for an access token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `redirectURL` | `string` |
| `scope` | `string`[] |
| `clientId` | `string` |

#### Returns

`string`

#### Defined in

[sdk/EnvoyUserAPI.ts:240](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L240)

___

### loginAsPluginInstaller

▸ `Static` **loginAsPluginInstaller**(`installId`, `clientId?`, `clientSecret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `plugin_install` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `clientId` | `string` |
| `clientSecret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:306](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L306)

___

### loginAsUserWithCode

▸ `Static` **loginAsUserWithCode**(`code`, `scope`, `clientId?`, `clientSecret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `code` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |
| `scope` | `string`[] |
| `clientId` | `string` |
| `clientSecret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:280](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L280)

___

### loginAsUserWithPassword

▸ `Static` **loginAsUserWithPassword**(`username`, `password`, `scope`, `clientId?`, `clientSecret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `password` as the grant type (discouraged - use [loginAsUserWithCode](envoyuserapi.md#loginasuserwithcode) below).

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |
| `scope` | `string`[] |
| `clientId` | `string` |
| `clientSecret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:252](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/48073ad/src/sdk/EnvoyUserAPI.ts#L252)
