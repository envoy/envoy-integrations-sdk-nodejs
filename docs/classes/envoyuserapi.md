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

[base/EnvoyAPI.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/base/EnvoyAPI.ts#L59)

## Properties

### axios

• `Readonly` **axios**: `AxiosInstance`

HTTP Client with Envoy's defaults.

#### Inherited from

EnvoyAPI.axios

#### Defined in

[base/EnvoyAPI.ts:32](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/base/EnvoyAPI.ts#L32)

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

[sdk/EnvoyUserAPI.ts:114](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L114)

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

[sdk/EnvoyUserAPI.ts:31](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L31)

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

[sdk/EnvoyUserAPI.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L27)

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

[sdk/EnvoyUserAPI.ts:35](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L35)

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

[sdk/EnvoyUserAPI.ts:39](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L39)

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

[sdk/EnvoyUserAPI.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L59)

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

[sdk/EnvoyUserAPI.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L78)

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

[sdk/EnvoyUserAPI.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L43)

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

[sdk/EnvoyUserAPI.ts:85](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L85)

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

[sdk/EnvoyUserAPI.ts:102](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L102)

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

[sdk/EnvoyUserAPI.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L47)

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

[sdk/EnvoyUserAPI.ts:90](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L90)

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

[sdk/EnvoyUserAPI.ts:55](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L55)

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

[sdk/EnvoyUserAPI.ts:51](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L51)

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

[sdk/EnvoyUserAPI.ts:97](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L97)

___

### me

▸ **me**(): `Promise`<UserModel\>

#### Returns

`Promise`<UserModel\>

#### Defined in

[sdk/EnvoyUserAPI.ts:109](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L109)

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

[sdk/EnvoyUserAPI.ts:133](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L133)

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

[sdk/EnvoyUserAPI.ts:143](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L143)

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

[sdk/EnvoyUserAPI.ts:123](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L123)

___

### loginAsPluginInstaller

▸ `Static` **loginAsPluginInstaller**(`installId`, `id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `plugin_install` as the grant type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `installId` | `string` |
| `id` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:207](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L207)

___

### loginAsUserWithCode

▸ `Static` **loginAsUserWithCode**(`code`, `scope?`, `id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `code` as the grant type.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `scope` | `string`[] | [] |
| `id` | `string` | `undefined` |
| `secret` | `string` | `undefined` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:181](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L181)

___

### loginAsUserWithPassword

▸ `Static` **loginAsUserWithPassword**(`username`, `password`, `scope?`, `id?`, `secret?`): `Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

Gets a user access token using `password` as the grant type (discouraged).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `username` | `string` | `undefined` |
| `password` | `string` | `undefined` |
| `scope` | `string`[] | [] |
| `id` | `string` | `undefined` |
| `secret` | `string` | `undefined` |

#### Returns

`Promise`<[EnvoyMetaAuth](../README.md#envoymetaauth)\>

#### Defined in

[sdk/EnvoyUserAPI.ts:153](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyUserAPI.ts#L153)
