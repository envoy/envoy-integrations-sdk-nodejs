# Envoy Node.js SDK

The SDK exports several classes and functions, however the most typical way to integrate the SDK is as middleware. The `middleware()` function call returns a middleware that attaches an instance of `EnvoyPluginSDK` to the `req` object and verifies that the request came from Envoy. It is available as `req.envoy`.

## Installation

```bash
npm install --save @envoy/envoy-integrations-sdk
```

### Environment Variables

The SDK relies on a few environment variables:

* `ENVOY_CLIENT_ID` - can be found in the Integration Builder
* `ENVOY_CLIENT_SECRET` - can be found in the Integration Builder
* `ENVOY_BASE_URL` - \(optional in production\) the URL to Envoy's API
* `JWT_SECRET` - \(optional\) used if encoding/decoding JWTs

Locally, these environment variables can be set using a `.env` file.

### Getting Started

View our Node.js [quickstart guide](https://developers.envoy.com/hub/docs/nodejs).  

### Usage

Here's the typical SDK usage at a glance.

```javascript
const express = require('express');
const { middleware, errorMiddleware, asyncHandler } = require('@envoy/envoy-integrations-sdk');

const app = express();
/**
 * "middleware()" returns an instance of bodyParser.json,
 * that also verifies the Envoy signature in addition to
 * parsing the request body as JSON.
 */
app.use(middleware());

app.post('/url-to-a-route-or-worker', asyncHandler(async (req, res) => {

 /**
  * @type EnvoyPluginSDK
  */
  const { envoy } = req;  // "envoy" is the SDK
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
  const { value } = await installStorage.setUnique('foo'); // creates and returns a unique text value for foo
  const { value } = await installStorage.setUniqueNum('foo'); // creates and returns a unique number for foo
  const { value } = await installStorage.get('foo'); // also gets the current value of foo
  await installStorage.unset('foo'); // deletes foo
  /**
  * You can also send multiple commands at once,
  * to be executed in the same transaction.
  * The response will be an array of the results of each command, in order.
  */
  const results = await installStorage.pipeline().set('foo1', 'bar').unset('foo2').get('foo3').execute();

  /**
  * Job updates
  * Note that job.complete can take any number of attachments after the first argument.
  */
  await job.complete('Credentials provisioned.', { label: 'password', value: 'password' });
  await job.ignore('No credentials provisioned.', 'Email was not supplied.');
  await job.fail('Could not provision credentials.', 'Server could not be reached.');
  /**
  * You can also just attach things without completing the job.
  * Attach more things by providing more arguments.
  */
  await job.attach({ type: 'text', label: 'foo', value: 'bar' });
  /**
  * If the job is some multi-step process,
  * you can update it's message without changing the status.
  * You can also optionally attach things by providing more arguments.
  */
  await job.update('Still working...');

  /**
  * JWT usage
  */
  const token = await jwt.encode(visitorId, '30m');
  const { sub: visitorId } = await jwt.decode(token);

  /**
  * If in a validation URL:
  */
  res.send({ foo: 'bar' }); // will save foo in the installation config.
  // or
  res.sendFailed('This step has failed validation.'); // prevent the installer from progressing.

  /**
  * If in an options URL:
  */
  res.send([ { label: 'Foo', value: 1 }, { label: 'Bar', value: 2 } ]); // display these options in the dropdown.

  /**
  * If in a worker:
  */
  res.send({ hello: 'world' }); // the job was a success, and here's some data about it.
  // or
  res.sendOngoing({ hello: 'world' }); // the job is still ongoing, but here's some data about it.
  // or
  res.sendIgnored("We're not gonna do this one, sorry.", { hello: 'world' }); // doesnt meet the requirements to continue.
  // or
  res.sendFailed('We tried, but failed.', { hello: 'world' }); // we cant continue with this job.

}));

app.use(errorMiddleware());
```

## SDK Reference

For completeness, here is a list of each module exported by the SDK package.

| Name | Type |
| :--- | :--- |
| EnvoyAPI | [EnvoyAPI](envoyapi.md) |
| EnvoyJWT | [EnvoyJWT](envoyjwt.md) |
| EnvoyPluginJob | [EnvoyPluginJob](envoypluginjob.md) |
| EnvoyPluginSDK | [EnvoyPluginSDK](envoypluginsdk.md) |
| EnvoyPluginStorage | [EnvoyPluginStorage](envoypluginstorage.md) |
| EnvoyPluginStoragePipeline | [EnvoyPluginStoragePipeline](envoypluginstoragepipeline.md) |
| EnvoySignatureVerifier | [EnvoySignatureVerifier](envoysignatureverifier.md) |
| middleware | [middleware](middleware.md) |
| errorMiddleware | [errorMiddleware](errormiddleware.md) |
| asyncHandler | [asyncHandler](asynchandler.md) |

### Contributing

We're happy to accept contributions. [Submit a PR](https://github.com/envoy/envoy-integrations-sdk-nodejs/pulls).
