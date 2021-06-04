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

- [EnvoyResponse](interfaces/envoyresponse.md)
- [EnvoySignatureVerifierOptions](interfaces/envoysignatureverifieroptions.md)

### Type aliases

- [EnvoyMiddleware](README.md#envoymiddleware)
- [EnvoyRequest](README.md#envoyrequest)
- [EnvoyStorageItem](README.md#envoystorageitem)

### Functions

- [asyncHandler](README.md#asynchandler)
- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## Type aliases

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

[middleware.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/middleware.ts#L12)

___

### EnvoyRequest

Ƭ **EnvoyRequest**<Payload\>: `EnvoyBaseRequest`<EnvoyRouteMeta \| EnvoyEventMeta, Payload\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Payload` | `Payload` = `unknown` |

#### Defined in

[EnvoyRequest.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/EnvoyRequest.ts#L41)

___

### EnvoyStorageItem

Ƭ **EnvoyStorageItem**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `unknown` |

#### Defined in

[EnvoyStorageItem.ts:1](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/EnvoyStorageItem.ts#L1)

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

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/asyncHandler.ts#L10)

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

[errorMiddleware.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/errorMiddleware.ts#L9)

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

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/015c9eb/src/middleware.ts#L21)
