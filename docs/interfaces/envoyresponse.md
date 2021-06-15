[@envoy/envoy-integrations-sdk](../README.md) / EnvoyResponse

# Interface: EnvoyResponse<Body\>

Use to type your `res` object in Envoy event handlers.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Body` | `Body` = `unknown` |

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

• **send**: (`body?`: `Body`) => [EnvoyResponse](envoyresponse.md)<Body\>

#### Type declaration

▸ (`body?`): [EnvoyResponse](envoyresponse.md)<Body\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `body?` | `Body` |

##### Returns

[EnvoyResponse](envoyresponse.md)<Body\>

#### Overrides

Response.send

#### Defined in

[sdk/EnvoyResponse.ts:12](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L12)

___

### sendFailed

• **sendFailed**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

Marks the job as "failed". The message will be communicated to the Envoy Dashboard user.

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

[sdk/EnvoyResponse.ts:27](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L27)

___

### sendIgnored

• **sendIgnored**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

Marks the job as "ignored". Useful when you explicitly do not want to handle the event.

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

[sdk/EnvoyResponse.ts:22](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L22)

___

### sendOngoing

• **sendOngoing**: (`debugInfo?`: `unknown`) => `void`

Marks the job as "ongoing". This is useful for long-running event handling.
Later on, you should update the job using
[EnvoyPluginJob.complete](../classes/envoypluginjob.md#complete), [EnvoyPluginJob.fail](../classes/envoypluginjob.md#fail), or [EnvoyPluginJob.ignore](../classes/envoypluginjob.md#ignore).

#### Type declaration

▸ (`debugInfo?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

`void`

#### Defined in

[sdk/EnvoyResponse.ts:18](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L18)
