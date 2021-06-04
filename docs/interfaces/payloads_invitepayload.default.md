[@envoy/envoy-integrations-sdk](../README.md) / [payloads/InvitePayload](../modules/payloads_invitepayload.md) / default

# Interface: default

[payloads/InvitePayload](../modules/payloads_invitepayload.md).default

## Table of contents

### Properties

- [attributes](payloads_invitepayload.default.md#attributes)
- [id](payloads_invitepayload.default.md#id)
- [relationships](payloads_invitepayload.default.md#relationships)
- [type](payloads_invitepayload.default.md#type)

## Properties

### attributes

• **attributes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `arrived` | `boolean` |
| `been-here-before` | `boolean` |
| `edit-token` | `string` |
| `email` | ``null`` \| `string` |
| `employee-screening-flow` | `boolean` |
| `expected-arrival-time` | `string` |
| `flow-id` | `string` |
| `flow-name` | `string` |
| `full-name` | `string` |
| `inviter-email` | ``null`` \| `string` |
| `inviter-name` | ``null`` \| `string` |
| `legal-docs?` | { `agreement`: { `id`: `string`  } ; `id`: `string` ; `signed-at`: `string` ; `url`: `string`  }[] |
| `nda?` | `string` |
| `photo-url` | ``null`` \| `string` |
| `preregistration-complete` | `boolean` |
| `private-notes` | ``null`` \| `string` |
| `qr-code` | ``null`` \| `string` |
| `qr-code-sent-at` | ``null`` \| `string` |
| `reminder-sent-at` | ``null`` \| `string` |
| `secret-token` | `string` |
| `signed-in-at?` | `string` |
| `signed-out-at?` | `string` |
| `user-data` | { `field`: `string` ; `value`: ``null`` \| `string`  }[] |

#### Defined in

[payloads/InvitePayload.ts:6](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/InvitePayload.ts#L6)

___

### id

• **id**: `string`

#### Defined in

[payloads/InvitePayload.ts:4](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/InvitePayload.ts#L4)

___

### relationships

• **relationships**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `agreeable-ndas?` | `Object` |
| `agreeable-ndas.data` | `default`<``"agreeable-ndas"``, string\>[] |
| `employee?` | `Object` |
| `employee.data` | `default`<``"employees"``, string\> |
| `entry?` | `Object` |
| `entry.data` | `default`<``"entries"``, string\> |
| `flow?` | `Object` |
| `flow.data` | `default`<``"flows"``, string\> |
| `location` | `Object` |
| `location.data` | `default`<``"locations"``, string\> |

#### Defined in

[payloads/InvitePayload.ts:41](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/InvitePayload.ts#L41)

___

### type

• **type**: ``"invites"``

#### Defined in

[payloads/InvitePayload.ts:5](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/d8fa581/src/payloads/InvitePayload.ts#L5)
