[@envoy/envoy-integrations-sdk](../README.md) / EnvoyRouteMeta

# Interface: EnvoyRouteMeta

Metadata that will be included in the request body for setup routes,
like validation URLs or options URLs.

## Table of contents

### Properties

- [auth](envoyroutemeta.md#auth)
- [company](envoyroutemeta.md#company)
- [config](envoyroutemeta.md#config)
- [forwarded\_bearer\_token](envoyroutemeta.md#forwarded_bearer_token)
- [install\_id](envoyroutemeta.md#install_id)
- [location](envoyroutemeta.md#location)
- [params](envoyroutemeta.md#params)
- [plugin\_id](envoyroutemeta.md#plugin_id)
- [route](envoyroutemeta.md#route)

## Properties

### auth

• **auth**: ``null`` \| [EnvoyMetaAuth](../README.md#envoymetaauth)

#### Defined in

[EnvoyMeta.ts:77](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L77)

___

### company

• **company**: [EnvoyMetaCompany](envoymetacompany.md)

#### Defined in

[EnvoyMeta.ts:76](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L76)

___

### config

• **config**: `Record`<string, unknown\>

#### Defined in

[EnvoyMeta.ts:73](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L73)

___

### forwarded\_bearer\_token

• `Optional` **forwarded\_bearer\_token**: `string`

#### Defined in

[EnvoyMeta.ts:78](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L78)

___

### install\_id

• **install\_id**: `string`

#### Defined in

[EnvoyMeta.ts:72](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L72)

___

### location

• **location**: [EnvoyMetaLocation](envoymetalocation.md)

#### Defined in

[EnvoyMeta.ts:75](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L75)

___

### params

• **params**: `Record`<string, unknown\>

#### Defined in

[EnvoyMeta.ts:74](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L74)

___

### plugin\_id

• **plugin\_id**: `string`

#### Defined in

[EnvoyMeta.ts:71](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L71)

___

### route

• **route**: `string`

#### Defined in

[EnvoyMeta.ts:70](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/a7d8339/src/EnvoyMeta.ts#L70)
