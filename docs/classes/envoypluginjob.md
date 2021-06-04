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

## Constructors

### constructor

• **new EnvoyPluginJob**(`pluginAPI`, `jobId`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `pluginAPI` | [EnvoyPluginAPI](envoypluginapi.md) |
| `jobId` | `string` |

#### Defined in

[EnvoyPluginJob.ts:15](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/aecf47b/src/EnvoyPluginJob.ts#L15)
