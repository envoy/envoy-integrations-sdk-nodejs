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
- [loginAsPluginInstaller](envoyuserapi.md#loginasplugininstaller)
- [loginAsUser](envoyuserapi.md#loginasuser)

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

[EnvoyAPI.ts:58](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyAPI.ts#L58)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[EnvoyAPI.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyAPI.ts#L31)

## Methods

### createInvite

▸ **createInvite**(`invite`): `Promise`<InviteModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[EnvoyUserAPI.ts:111](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L111)

___

### getAgreement

▸ **getAgreement**(`id`, `include?`): `Promise`<AgreementModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<AgreementModel\>

#### Defined in

[EnvoyUserAPI.ts:28](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L28)

___

### getAgreementPage

▸ **getAgreementPage**(`id`, `include?`): `Promise`<AgreementPageModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<AgreementPageModel\>

#### Defined in

[EnvoyUserAPI.ts:24](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L24)

___

### getCompany

▸ **getCompany**(`id`, `include?`): `Promise`<CompanyModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<CompanyModel\>

#### Defined in

[EnvoyUserAPI.ts:32](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L32)

___

### getEmployee

▸ **getEmployee**(`id`, `include?`): `Promise`<EmployeeModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<EmployeeModel\>

#### Defined in

[EnvoyUserAPI.ts:36](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L36)

___

### getEmployeeByEmail

▸ **getEmployeeByEmail**(`email`, `include?`): `Promise`<EmployeeModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `email` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<EmployeeModel\>

#### Defined in

[EnvoyUserAPI.ts:56](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L56)

___

### getEmployees

▸ **getEmployees**(`params?`): `Promise`<EmployeeModel[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<EmployeeFilterFields, EmployeeSortFields\> |

#### Returns

`Promise`<EmployeeModel[]\>

#### Defined in

[EnvoyUserAPI.ts:75](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L75)

___

### getFlow

▸ **getFlow**(`id`, `include?`): `Promise`<FlowModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<FlowModel\>

#### Defined in

[EnvoyUserAPI.ts:40](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L40)

___

### getFlows

▸ **getFlows**(`params?`): `Promise`<FlowModel[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<FlowFilterFields, FlowSortFields\> |

#### Returns

`Promise`<FlowModel[]\>

#### Defined in

[EnvoyUserAPI.ts:82](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L82)

___

### getInvites

▸ **getInvites**(`params?`): `Promise`<InviteModel[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<InviteFilterFields, InviteSortFields\> |

#### Returns

`Promise`<InviteModel[]\>

#### Defined in

[EnvoyUserAPI.ts:99](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L99)

___

### getLocation

▸ **getLocation**(`id`, `include?`): `Promise`<LocationModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<LocationModel\>

#### Defined in

[EnvoyUserAPI.ts:44](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L44)

___

### getLocations

▸ **getLocations**(`params?`): `Promise`<LocationModel[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `default`<LocationFilterFields, LocationSortFields\> |

#### Returns

`Promise`<LocationModel[]\>

#### Defined in

[EnvoyUserAPI.ts:87](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L87)

___

### getSignInField

▸ **getSignInField**(`id`, `include?`): `Promise`<SignInFieldModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<SignInFieldModel\>

#### Defined in

[EnvoyUserAPI.ts:52](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L52)

___

### getSignInFieldPage

▸ **getSignInFieldPage**(`id`, `include?`): `Promise`<SignInFieldPageModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `include?` | `string` |

#### Returns

`Promise`<SignInFieldPageModel\>

#### Defined in

[EnvoyUserAPI.ts:48](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L48)

___

### getSignInFields

▸ **getSignInFields**(`signInFieldPageId`): `Promise`<SignInFieldModel[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signInFieldPageId` | `string` |

#### Returns

`Promise`<SignInFieldModel[]\>

#### Defined in

[EnvoyUserAPI.ts:94](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L94)

___

### me

▸ **me**(): `Promise`<UserModel\>

#### Returns

`Promise`<UserModel\>

#### Defined in

[EnvoyUserAPI.ts:106](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L106)

___

### partialUpdateInvite

▸ **partialUpdateInvite**(`inviteId`, `invite`): `Promise`<InviteModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[EnvoyUserAPI.ts:130](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L130)

___

### removeInvite

▸ **removeInvite**(`inviteId`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[EnvoyUserAPI.ts:140](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L140)

___

### updateInvite

▸ **updateInvite**(`inviteId`, `invite`): `Promise`<InviteModel\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `inviteId` | `string` |
| `invite` | `InviteCreationModel` |

#### Returns

`Promise`<InviteModel\>

#### Defined in

[EnvoyUserAPI.ts:120](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L120)

___

### loginAsPluginInstaller

▸ `Static` **loginAsPluginInstaller**(`installId`, `id?`, `secret?`): `Promise`<EnvoyMetaAuth\>

Gets a user access token using `plugin_install` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<EnvoyMetaAuth\>

#### Defined in

[EnvoyUserAPI.ts:177](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L177)

___

### loginAsUser

▸ `Static` **loginAsUser**(`username`, `password`, `id?`, `secret?`): `Promise`<EnvoyMetaAuth\>

Gets a user access token using `password` as the grant type (discouraged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<EnvoyMetaAuth\>

#### Defined in

[EnvoyUserAPI.ts:150](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyUserAPI.ts#L150)
