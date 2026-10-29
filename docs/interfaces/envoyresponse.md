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
- [sendFailedScreen](envoyresponse.md#sendFailedScreen)
- [sendHiddenIgnored](envoyresponse.md#sendhiddenignored)
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

### sendFailedScreen

• **sendFailedScreen**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginScreenerJobAttachment`, ) => `void`

Halts processing of the job. The message will be communicated to the Envoy Dashboard user and a pop up modal for access approval will be displayed. 

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
The job stays visible in dashboard activity. Use [sendHiddenIgnored](envoyresponse.md#sendhiddenignored) for mechanical no-ops.

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

[sdk/EnvoyResponse.ts:24](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L24)

___

### sendHiddenIgnored

• **sendHiddenIgnored**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

Marks the job as "ignored" and hides it from dashboard activity.

Garaje drops the row only when the status is ignored and an attachment has type `hidden_job`.
A plain text attachment keeps its label and value, and its type is set to `hidden_job`.
With no attachment, the message is used for both label and value.

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

[sdk/EnvoyResponse.ts:33](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/410ee70/src/sdk/EnvoyResponse.ts#L33)

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
