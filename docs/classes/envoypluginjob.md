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

[EnvoyPluginJob.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L15)

## Properties

### api

• `Readonly` **api**: [EnvoyPluginAPI](envoypluginapi.md)

#### Defined in

[EnvoyPluginJob.ts:13](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L13)

___

### id

• `Readonly` **id**: `string`

#### Defined in

[EnvoyPluginJob.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L15)

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

[EnvoyPluginJob.ts:43](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L43)

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

[EnvoyPluginJob.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L47)

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

[EnvoyPluginJob.ts:22](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L22)

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

[EnvoyPluginJob.ts:55](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L55)

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

[EnvoyPluginJob.ts:51](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L51)

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

[EnvoyPluginJob.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/c08fadc/src/EnvoyPluginJob.ts#L59)
