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

[sdk/EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyResponse.ts#L9)

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

[sdk/EnvoyResponse.ts:24](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyResponse.ts#L24)

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

[sdk/EnvoyResponse.ts:19](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyResponse.ts#L19)

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

[sdk/EnvoyResponse.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/b26deae/src/sdk/EnvoyResponse.ts#L15)
