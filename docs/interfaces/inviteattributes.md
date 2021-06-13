[@envoy/envoy-integrations-sdk](../README.md) / InviteAttributes

# Interface: InviteAttributes

## Table of contents

### Properties

- [additional-guests](inviteattributes.md#additional-guests)
- [approval-status](inviteattributes.md#approval-status)
- [arrived](inviteattributes.md#arrived)
- [attested](inviteattributes.md#attested)
- [created-at](inviteattributes.md#created-at)
- [created-from](inviteattributes.md#created-from)
- [email](inviteattributes.md#email)
- [entry-signed-out-at](inviteattributes.md#entry-signed-out-at)
- [expected-arrival-time](inviteattributes.md#expected-arrival-time)
- [expected-departure-time](inviteattributes.md#expected-departure-time)
- [full-name](inviteattributes.md#full-name)
- [guest-updated-at](inviteattributes.md#guest-updated-at)
- [is-presigned](inviteattributes.md#is-presigned)
- [notify-visitor](inviteattributes.md#notify-visitor)
- [phone](inviteattributes.md#phone)
- [private-notes](inviteattributes.md#private-notes)
- [reminder-sent-at](inviteattributes.md#reminder-sent-at)
- [updated-at](inviteattributes.md#updated-at)
- [user-data](inviteattributes.md#user-data)

## Properties

### additional-guests

• `Optional` **additional-guests**: `number`

#### Defined in

[resources/InviteResource.ts:28](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L28)

___

### approval-status

• `Optional` **approval-status**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auto_approved` | `boolean` |
| `report` | { `messages`: { `failure?`: { `header`: `string` ; `text`: `string`  }  } ; `reason`: `string` ; `result`: ``"pending"`` \| ``"pass"`` \| ``"fail"`` ; `source`: `string`  }[] |
| `status` | ``"approved"`` \| ``"review"`` \| ``"pending"`` \| ``"denied"`` |

#### Defined in

[resources/InviteResource.ts:29](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L29)

___

### arrived

• `Optional` **arrived**: `boolean`

#### Defined in

[resources/InviteResource.ts:55](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L55)

___

### attested

• `Optional` **attested**: `boolean`

#### Defined in

[resources/InviteResource.ts:56](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L56)

___

### created-at

• `Optional` **created-at**: `string`

#### Defined in

[resources/InviteResource.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L59)

___

### created-from

• `Optional` **created-from**: `string`

#### Defined in

[resources/InviteResource.ts:53](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L53)

___

### email

• `Optional` **email**: `string`

#### Defined in

[resources/InviteResource.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L45)

___

### entry-signed-out-at

• `Optional` **entry-signed-out-at**: `string`

#### Defined in

[resources/InviteResource.ts:56](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L56)

___

### expected-arrival-time

• `Optional` **expected-arrival-time**: `string`

#### Defined in

[resources/InviteResource.ts:45](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L45)

___

### expected-departure-time

• `Optional` **expected-departure-time**: `string`

#### Defined in

[resources/InviteResource.ts:46](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L46)

___

### full-name

• `Optional` **full-name**: `string`

#### Defined in

[resources/InviteResource.ts:47](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L47)

___

### guest-updated-at

• `Optional` **guest-updated-at**: `string`

#### Defined in

[resources/InviteResource.ts:48](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L48)

___

### is-presigned

• `Optional` **is-presigned**: `boolean`

#### Defined in

[resources/InviteResource.ts:49](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L49)

___

### notify-visitor

• `Optional` **notify-visitor**: `boolean`

#### Defined in

[resources/InviteResource.ts:52](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L52)

___

### phone

• `Optional` **phone**: `string`

#### Defined in

[resources/InviteResource.ts:59](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L59)

___

### private-notes

• `Optional` **private-notes**: `string`

#### Defined in

[resources/InviteResource.ts:50](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L50)

___

### reminder-sent-at

• `Optional` **reminder-sent-at**: `string`

#### Defined in

[resources/InviteResource.ts:57](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L57)

___

### updated-at

• `Optional` **updated-at**: `string`

#### Defined in

[resources/InviteResource.ts:60](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L60)

___

### user-data

• `Optional` **user-data**: `Record`<string, ``null`` \| string\>

#### Defined in

[resources/InviteResource.ts:51](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/6f08a82/src/resources/InviteResource.ts#L51)
