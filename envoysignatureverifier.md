---
description: Verifies that request bodies are from Envoy and are meant for your plugin.
---

# EnvoySignatureVerifier

## Constructor

#### const signatureVerifier = new EnvoySignatureVerifier\(\[options\]\)

| Param | Type |
| :--- | :--- |
| \[options\] | `SignatureVerifierOptions` |

## Properties and Methods

* _instance_
  * .verify\(req, rawBody\) ⇒ `boolean`

#### envoySignatureVerifier.verify\(req, rawBody\) ⇒ `boolean`

Verifies that the signature provided matches the request body.

**Kind**: instance method of `EnvoySignatureVerifier`

| Param | Type |
| :--- | :--- |
| req |  |
| rawBody | `Buffer` |

## Related Classes

### SignatureVerifierOptions : `Object`

**Properties**

| Name | Type | Default |
| :--- | :--- | :--- |
| algorithm | `string` | `"sha256"` |
| encoding | `string` | `"base64"` |
| secret | `string` | `process.env.ENVOY_CLIENT_SECRET` |
| header | `string` | `"x-envoy-signature"` |

