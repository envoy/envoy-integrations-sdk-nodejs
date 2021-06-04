Use to type your `res` object in Envoy request handlers.

## Hierarchy

- `Response`

  ↳ **EnvoyResponse**

## Table of contents

### Properties

- [send](../wiki/Interface:%20EnvoyResponse#send)
- [sendFailed](../wiki/Interface:%20EnvoyResponse#sendfailed)
- [sendIgnored](../wiki/Interface:%20EnvoyResponse#sendignored)
- [sendOngoing](../wiki/Interface:%20EnvoyResponse#sendongoing)

## Properties

### send

• **send**: (`debugInfo?`: `unknown`) => [EnvoyResponse](../wiki/Interface:%20EnvoyResponse)

#### Type declaration

▸ (`debugInfo?`): [EnvoyResponse](../wiki/Interface:%20EnvoyResponse)

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

[EnvoyResponse](../wiki/Interface:%20EnvoyResponse)

#### Overrides

Response.send

#### Defined in

[EnvoyResponse.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyResponse.ts#L8)

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

[EnvoyResponse.ts:11](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyResponse.ts#L11)

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

[EnvoyResponse.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyResponse.ts#L10)

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

[EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/f50d6c5/src/EnvoyResponse.ts#L9)
