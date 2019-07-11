# SDK for webhook-based plugins

## Usage
The SDK can be used either standalone, or as a middleware that attaches itself to the `req` object. For convenience, use the middleware.

### Setup
You need to have the following environment variables set:
- `ENVOY_API_TOKEN`: the plugin's API token
- `ENVOY_CLIENT_SECRET`: the plugin's client secret
- `ENVOY_BASE_URL` (optional in production): the base URL to envoy-web
- `JWT_SECRET` (optional if no JWTs are minted): a random long string to encode/decode JWTs 

### Example
```js
const express = require('express');
const bodyParser = require('body-parser');
const { verifyMiddleware, sdkMiddleware } = require('envoy-plugin-sdk-nodejs');

const app = express();
/**
 * verifyMiddleware - Verifies the request came from Envoy.
 * bodyParser.json - Parses the request body as JSON.
 * sdkMiddleware - attaches the SDK to the req object.
 */
app.use(verifyMiddleware(), bodyParser.json(), sdkMiddleware());

app.get('/url-to-a-route-or-worker', async (req, res) => {
  
  const { envoy } = req; // envoy is the SDK
  const {
    meta, // the platform event request_meta object
    payload, // the platform event request_body object
    userAPI, // user-scoped API calls, used in routes 
    pluginAPI, // plugin-scoped API calls, for plugin services
    installStorage, // install-scoped storage
    globalStorage, // global-scoped storage
    job, // update the job (if in a worker)
    jwt, // helper to encode/decode jwts
  } = envoy;
  
  /**
  * User API usage
  */
  const visitorTypes = await userAPI.flows(locationId);
  
  /**
  * Storage usage
  * The below can be used both at the install level or global level
  */
  await installStorage.set('foo', 'bar'); // sets foo=bar in storage for this install
  const { value } = await installStorage.setUnique('foo'); // creates and returns a unique value for foo
  const { value } = await installStorage.get('foo'); // also gets the current value of foo
  await installStorage.unset('foo'); // deletes foo
  
  /**
  * Job updates
  * All of the below can take optional attachments as the last parameter.
  */
  await job.complete('Credentials provisioned.', [{ type: 'password', label: 'password', value: 'password' }]);
  await job.ignore('No credentials provisioned.', 'Email was not supplied.');
  await job.fail('Could not provision credentials.', 'Server could not be reached.');
  /**
  * You can also just attach things without updating the status. 
  */
  await job.attach([{ type: 'text', label: 'foo', value: 'bar' }]);
  
  /**
  * JWT usage 
  */
  const token = await jwt.encode(visitorId, '30m');
  const { sub: visitorId } = await jwt.decode(token);
  
  res.send({ hello: 'world' }); // will get set as the response_body in the platform event.
  
});
```
