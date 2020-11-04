---
description: Use this middleware to automatically and safely include Envoy in your plugin.
---

# middleware

## Example

```javascript
const express = require('express');
const { middleware } = require('envoy-integrations-sdk-nodejs');

const app = express();
app.use(middleware());
```

## Functions

### middleware\(\[options\]\) ⇒ `connectMiddleware`

Returns an instance of `bodyParser.json`, which also verifies that the request came from Envoy. It also attaches an instance of `EnvoyPluginSDK` attached to the `req` object, accessible at `req.envoy`.

**Kind**: global function

| Param | Type |
| :--- | :--- |
| \[options\] | `SignatureVerifierOptions` |

### Related Functions and Classes

### connectMiddleware : `function`

Express/connect middleware.

**Kind**: global typedef

| Param | Type |
| :--- | :--- |
| req | [http://expressjs.com/en/4x/api.html\#req](http://expressjs.com/en/4x/api.html#req) |
| res | [http://expressjs.com/en/4x/api.html\#res](http://expressjs.com/en/4x/api.html#res) |
| next | `function` |

### SignatureVerifierOptions : `Object`

**Properties**

| Name | Type | Default |
| :--- | :--- | :--- |
| algorithm | `string` | `"sha256"` |
| encoding | `string` | `"base64"` |
| secret | `string` | `process.env.ENVOY_CLIENT_SECRET` |
| header | `string` | `"x-envoy-signature"` |

