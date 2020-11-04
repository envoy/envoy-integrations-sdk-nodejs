---
description: >-
  Use this wrapper around your `async` endpoint handlers to catch Promise-based
  errors.
---

# asyncHandler

## Example

```javascript
const express = require('express');
const { middleware, asyncHandler } = require('envoy-integrations-sdk-nodejs');

const app = express();
app.use(middleware());
app.post('/foo', asyncHandler(async (req, res) => {
  await somePromiseThatThrowsAnError();
}));
```

## Functions

### asyncHandler\(handler\) ⇒ `connectHandler`

Returns a wrapped handler that catches Promise-based errors.

**Kind**: global function

| Param | Type |
| :--- | :--- |
| handler | `connectHandler` |

### Related Functions and Classes

### connectHandler : `function`

Express/connect middleware.

**Kind**: global typedef

| Param | Type |
| :--- | :--- |
| req | [http://expressjs.com/en/4x/api.html\#req](http://expressjs.com/en/4x/api.html#req) |
| res | [http://expressjs.com/en/4x/api.html\#res](http://expressjs.com/en/4x/api.html#res) |

