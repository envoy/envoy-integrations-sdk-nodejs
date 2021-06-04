[@envoy/envoy-integrations-sdk](../README.md) / [index](../modules/index.md) / EnvoyResponse

# Interface: EnvoyResponse

[index](../modules/index.md).EnvoyResponse

Use to type your `res` object in Envoy request handlers.

## Hierarchy

- `Response`

  ↳ **EnvoyResponse**

## Table of contents

### Properties

- [send](index.envoyresponse.md#send)
- [sendFailed](index.envoyresponse.md#sendfailed)
- [sendIgnored](index.envoyresponse.md#sendignored)
- [sendOngoing](index.envoyresponse.md#sendongoing)

## Properties

### send

• **send**: (`debugInfo?`: `unknown`) => [EnvoyResponse](index.envoyresponse.md)

#### Type declaration

▸ (`debugInfo?`): [EnvoyResponse](index.envoyresponse.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

[EnvoyResponse](index.envoyresponse.md)

#### Overrides

Response.send

#### Defined in

[EnvoyResponse.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyResponse.ts#L8)

___

### sendFailed

• **sendFailed**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

#### Type declaration

▸ (`message`, `debugInfo?`, ...`attachments`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `debugInfo?` | `unknown` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

##### Returns

`void`

#### Defined in

[EnvoyResponse.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyResponse.ts#L11)

___

### sendIgnored

• **sendIgnored**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

#### Type declaration

▸ (`message`, `debugInfo?`, ...`attachments`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `debugInfo?` | `unknown` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

##### Returns

`void`

#### Defined in

[EnvoyResponse.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyResponse.ts#L10)

___

### sendOngoing

• **sendOngoing**: (`debugInfo?`: `unknown`) => `void`

#### Type declaration

▸ (`debugInfo?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

`void`

#### Defined in

[EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/EnvoyResponse.ts#L9)
