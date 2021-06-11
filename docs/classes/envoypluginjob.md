[@envoy/envoy-integrations-sdk](../README.md) / EnvoyPluginJob

# Class: EnvoyPluginJob

A "job" is an event, like `entry_sign_in`.
When your plugin handles the event, you can use this job concept
to update the status (e.g. complete, failed, ignored)
as well as attach extra data to the event's subject
(e.g. showing a generated card number in the dashboard for a visitor on `entry_sign_in`).

## Table of contents

### Constructors

- [constructor](envoypluginjob.md#constructor)

### Properties

- [api](envoypluginjob.md#api)
- [id](envoypluginjob.md#id)

### Methods

- [attach](envoypluginjob.md#attach)
- [complete](envoypluginjob.md#complete)
- [execute](envoypluginjob.md#execute)
- [fail](envoypluginjob.md#fail)
- [ignore](envoypluginjob.md#ignore)
- [update](envoypluginjob.md#update)

## Constructors

### constructor

• **new EnvoyPluginJob**(`pluginAPI`, `jobId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](envoypluginapi.md) |
| `jobId` | `string` |

#### Defined in

[sdk/EnvoyPluginJob.ts:17](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L17)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[sdk/EnvoyPluginJob.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L15)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[sdk/EnvoyPluginJob.ts:17](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L17)

## Methods

### attach

▸ **attach**(...`attachments`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L45)

___

### complete

▸ **complete**(`message`, ...`attachments`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:49](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L49)

___

### execute

▸ **execute**(`status`, `message`, `reason`, `attachments?`): `Promise`<void\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `status` | ``null`` \| `string` | `undefined` |
| `message` | ``null`` \| `string` | `undefined` |
| `reason` | ``null`` \| `string` | `undefined` |
| `attachments` | `EnvoyPluginJobAttachment`[] | [] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:24](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L24)

___

### fail

▸ **fail**(`message`, `reason`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `reason` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:57](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L57)

___

### ignore

▸ **ignore**(`message`, `reason`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `reason` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L53)

___

### update

▸ **update**(`message`, ...`attachments`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

#### Returns

`Promise`<void\>

#### Defined in

[sdk/EnvoyPluginJob.ts:61](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/11f594b/src/sdk/EnvoyPluginJob.ts#L61)
