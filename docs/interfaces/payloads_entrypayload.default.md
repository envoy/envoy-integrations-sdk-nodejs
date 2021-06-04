[@envoy/envoy-integrations-sdk](../README.md) / [payloads/EntryPayload](../modules/payloads_entrypayload.md) / default

# Interface: default

[payloads/EntryPayload](../modules/payloads_entrypayload.md).default

## Table of contents

### Properties

- [attributes](payloads_entrypayload.default.md#attributes)
- [id](payloads_entrypayload.default.md#id)
- [relationships](payloads_entrypayload.default.md#relationships)
- [type](payloads_entrypayload.default.md#type)

## Properties

### attributes

• **attributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `email` | ``null`` \| `string` |
| `employee-screening-flow` | `boolean` |
| `flow-name` | `string` |
| `full-name` | `string` |
| `host` | ``null`` \| `string` |
| `host-email` | ``null`` \| `string` |
| `legal-docs?` | { `agreement`: { `id`: `string`  } ; `id`: `string` ; `signed-at`: `string` ; `url`: `string`  }[] |
| `nda?` | `string` |
| `phone-number?` | `string` |
| `private-notes` | ``null`` \| `string` |
| `signed-in-at` | `string` |
| `signed-out-at?` | `string` |
| `thumbnails` | `Object` |
| `thumbnails.large` | ``null`` \| `string` |
| `thumbnails.original` | ``null`` \| `string` |
| `thumbnails.small` | ``null`` \| `string` |
| `user-data` | { `field`: `string` ; `value`: ``null`` \| `string`  }[] |

#### Defined in

[payloads/EntryPayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/EntryPayload.ts#L6)

___

### id

• **id**: `string`

#### Defined in

[payloads/EntryPayload.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/EntryPayload.ts#L4)

___

### relationships

• **relationships**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `agreeable-ndas?` | `Object` |
| `agreeable-ndas.data` | `default`<``"agreeable-ndas"``, string\>[] |
| `device?` | `Object` |
| `device.data` | `default`<``"devices"``, string\> |
| `employee?` | `Object` |
| `employee.data` | `default`<``"employees"``, string\> |
| `flow?` | `Object` |
| `flow.data` | `default`<``"flows"``, string\> |
| `invite?` | `Object` |
| `invite.data` | `default`<``"invites"``, string\> |
| `location` | `Object` |
| `location.data` | `default`<``"locations"``, string\> |
| `visitor-entrance?` | `Object` |
| `visitor-entrance.data` | `default`<``"visitor-entrances"``, string\> |

#### Defined in

[payloads/EntryPayload.ts:36](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/EntryPayload.ts#L36)

___

### type

• **type**: ``"entries"``

#### Defined in

[payloads/EntryPayload.ts:5](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/EntryPayload.ts#L5)
