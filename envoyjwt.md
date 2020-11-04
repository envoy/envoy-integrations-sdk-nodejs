---
description: Encodes/decodes JWTs
---

# EnvoyJWT

## Constructor

#### const jwt = new EnvoyJWT\(\[secret\], \[algorithm\]\)

| Param | Type | Default |
| :--- | :--- | :--- |
| \[secret\] | `string` | `process.env.JWT_SECRET` |
| \[algorithm\] | `string` | `"HS256"` |

## Properties and Methods

* _instance_
  * .encode\(subject, expiresIn, \[payload\]\) ⇒ `Promise.<string>`
  * .decode\(token, \[options\]\) ⇒ `Promise.<{}>`

#### envoyJWT.encode\(subject, expiresIn, \[payload\]\) ⇒ `Promise.<string>`

Creates a JWT.

**Kind**: instance method of `EnvoyJWT`

| Param | Type | Description |
| :--- | :--- | :--- |
| subject | `string` \| `number` \| `null` |  |
| expiresIn | `string` \| `number` \| `null` | seconds or string like: [https://github.com/zeit/ms](https://github.com/zeit/ms) |
| \[payload\] | `Object` |  |

#### envoyJWT.decode\(token, \[options\]\) ⇒ `Promise.<{}>`

**Kind**: instance method of `EnvoyJWT`

| Param | Type |
| :--- | :--- |
| token | `string` |
| \[options\] | `JWTOptions` |

### JWTOptions : `Object`

[https://www.npmjs.com/package/jsonwebtoken\#jwtverifytoken-secretorpublickey-options-callback](https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback)

