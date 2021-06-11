[@envoy/envoy-integrations-sdk](../README.md) / EnvoyResponse

# Interface: EnvoyResponse

Use to type your `res` object in Envoy request handlers.

## Hierarchy

- `Response`

  ↳ **EnvoyResponse**

## Table of contents

### Properties

- [send](envoyresponse.md#send)
- [sendFailed](envoyresponse.md#sendfailed)
- [sendIgnored](envoyresponse.md#sendignored)
- [sendOngoing](envoyresponse.md#sendongoing)

## Properties

### send

• **send**: (`debugInfo?`: `unknown`) => [EnvoyResponse](envoyresponse.md)

#### Type declaration

▸ (`debugInfo?`): [EnvoyResponse](envoyresponse.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

[EnvoyResponse](envoyresponse.md)

#### Overrides

Response.send

#### Defined in

[sdk/EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyResponse.ts#L9)

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

[sdk/EnvoyResponse.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyResponse.ts#L12)

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

[sdk/EnvoyResponse.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyResponse.ts#L11)

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

[sdk/EnvoyResponse.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyResponse.ts#L10)
