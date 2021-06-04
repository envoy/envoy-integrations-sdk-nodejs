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

### Functions

- [asyncHandler](README.md#asynchandler)
- [errorMiddleware](README.md#errormiddleware)
- [middleware](README.md#middleware)

## Functions

### asyncHandler

▸ **asyncHandler**(`handler`): (`req`: `default`<EnvoyMeta, unknown\>, `res`: `default`, `next`: `NextFunction`) => `Promise`<void\>

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
| `req` | `default`<EnvoyMeta, unknown\> |
| `res` | `default` |
| `next` | `NextFunction` |

##### Returns

`Promise`<void\>

#### Defined in

[asyncHandler.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/asyncHandler.ts#L10)

___

### errorMiddleware

▸ **errorMiddleware**(`onError?`): (`err`: `Error`, `req`: `Request`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>, `res`: `Response`<any, Record<string, any\>\>, `next`: `NextFunction`) => `void`

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
| `req` | `Request`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\> |
| `res` | `Response`<any, Record<string, any\>\> |
| `next` | `NextFunction` |

##### Returns

`void`

#### Defined in

[errorMiddleware.ts:7](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/errorMiddleware.ts#L7)

___

### middleware

▸ **middleware**(`options?`): `EnvoyMiddleware`

Sets up an `EnvoyPluginSDK` object in the path `req.envoy`.
Modifies the `res` object to include Envoy's helpers, per `EnvoyResponse`.

Also verifies that the request is coming from Envoy,
as well as managing the plugin access token lifecycle.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `EnvoySignatureVerifierOptions` |

#### Returns

`EnvoyMiddleware`

#### Defined in

[middleware.ts:21](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/middleware.ts#L21)
