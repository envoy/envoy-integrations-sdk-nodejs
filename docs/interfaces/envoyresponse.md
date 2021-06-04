[@envoy/envoy-integrations-sdk](../README.md) / EnvoyResponse

# Interface: EnvoyResponse

Use to type your `res` object in Envoy request handlers.

## Hierarchy

- `Response`

  ↳ **EnvoyResponse**

## Table of contents

### Properties

- [sendFailed](envoyresponse.md#sendfailed)
- [sendIgnored](envoyresponse.md#sendignored)
- [sendOngoing](envoyresponse.md#sendongoing)

## Properties

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

[EnvoyResponse.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyResponse.ts#L10)

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

[EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyResponse.ts#L9)

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

[EnvoyResponse.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/229a60c/src/EnvoyResponse.ts#L8)
