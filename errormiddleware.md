---
description: Use this middleware to safely catch and serialize unexpected errors.
---

# errorMiddleware

## Example

```javascript
const express = require('express');
const { middleware, errorMiddleware } = require('envoy-integrations-sdk-nodejs');

const app = express();
app.use(middleware());
// define endpoints here
app.use(errorMiddleware());
```

## Functions

### errorMiddleware\(\) ⇒ `expressErrorMiddleware`

Returns an [Express.js error middleware](http://expressjs.com/en/guide/error-handling.html#writing-error-handlers), which serializes unexpected errors.

**Kind**: global function

### Related Functions and Classes

### `expressErrorMiddleware` : `function`

Express/connect middleware.

**Kind**: global typedef

| Param | Type |
| :--- | :--- |
| err | `Error` |
| req | [http://expressjs.com/en/4x/api.html\#req](http://expressjs.com/en/4x/api.html#req) |
| res | [http://expressjs.com/en/4x/api.html\#res](http://expressjs.com/en/4x/api.html#res) |
| next | `function` |

