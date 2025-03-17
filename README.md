# Envoy Node.js SDK

The SDK exports several classes and functions, however the most typical way to integrate the SDK is as middleware. The `envoyMiddleware()` function call returns a middleware that attaches an instance of `EnvoyPluginSDK` to the `req` object and verifies that the request came from Envoy. It is available as `req.envoy`.

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

#### Define your `config`
When customers go through your integration's setup steps, that info is saved in a `config` object that is sent along with every request Envoy makes to your integration.

Defining this object as a specific type allows us to safely type the various handlers that will use those values.

```typescript
// defs/Config.ts
type Config = {
  greeting: string
};
export default Config;
```

#### Implement setup routes
As customers go through the setup steps of your integration, they may trigger several requests to your integration for things like:
- loading dropdown options
- loading text fields with remote data
- validating submitted step data

Below, we'll implement a route that will load a list of greetings into a dropdown in our setup steps.
 
View the other types of handlers [here](docs#handler-functions).

```typescript
// greetingOptions.ts
import { optionsRouteHandler } from '@envoy/envoy-integrations-sdk';

export default optionsRouteHandler((req, res) => {
  res.send([
    {
      label: 'Hello',
      value: 'Hello',
    },
    {
      label: 'Hola',
      value: 'Hola',
    },
    {
      label: 'Aloha',
      value: 'Aloha',
    },
  ]);
});
```

#### Implement event handlers
Your integration can respond to several Envoy events. Below, we'll implement a simple event handler for an `entry_sign_in` event.

All it does is to take the greeting that the customer chose during setup, and displays it in the Envoy Dashboard when a visitor signs in.

View the other types of handlers [here](docs#handler-functions).

```typescript
// entrySignIn.ts
import { entryEventHandler } from '@envoy/envoy-integrations-sdk';
import Config from './defs/Config';

export default entryEventHandler<Config>(async (req, res) => {
  const { envoy } = req;
  const { job, meta, payload: visitor } = envoy;
  const hello = `${meta.config.greeting} ${visitor.attributes['full-name']}!`; // our custom greeting
  await job.attach({ label: 'Greeting', value: hello }); // show in the Envoy dashboard.
  res.send({ hello });
});
```


#### Setup your `express.js` app
Use the `envoyMiddleware` to get an instance of [EnvoyPluginSDK](docs/classes/envoypluginsdk.md) attached to every request.

View the other types of middleware [here](docs#middleware-functions).
```typescript
// index.ts
import express from 'express';
import { envoyMiddleware, errorMiddleware } from '@envoy/envoy-integrations-sdk';

import greetingOptions from './greetingOptions';
import entrySignIn from './entrySignIn'

const app = express();
app.use(envoyMiddleware());
app.post('/greeting-options', greetingOptions);
app.post('/entry-sign-in', entrySignIn);
app.use(errorMiddleware());
app.listen(process.env.PORT);
```

#### More examples
Here's some more things you can do with the `req.envoy` object.
```typescript
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
  job, // update the job (if in an event handler)
  jwt, // helper to encode/decode jwts
} = envoy;

/**
 * User API usage
 */
const visitorTypes = await userAPI.getFlows({ filter: { location: '1' } });

/**
 * Storage usage
 * The below can be used both at the install level or global level
 */
await installStorage.set('foo', 'bar'); // sets foo=bar in storage for this install
const { value } = await installStorage.get<string>('foo'); // also gets the current value of foo
const { value } = await installStorage.setUnique('foo'); // creates and returns a unique text value for foo
const { value } = await installStorage.get<string>('foo'); // also gets the current value of foo
const { value } = await installStorage.setUniqueNum('foo'); // creates and returns a unique number for foo
const { value } = await installStorage.get<number>('foo'); // also gets the current value of foo
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
 * If in a validation route:
 */
res.send({ foo: 'bar' }); // will save foo in the installation config.
// or
res.send({ foo: null }); // will remove foo from the installation config.
// or
res.sendFailed('This step has failed validation.'); // prevent the installer from progressing.

/**
 * If in an options route:
 */
res.send([ { label: 'Foo', value: 1 }, { label: 'Bar', value: 2 } ]); // display these options in the dropdown.

/**
 * If in an event handler:
 */
res.send({ hello: 'world' }); // the job was a success, and here's some data about it.
// or
res.sendOngoing("We're still working on it.", { hello: 'world' }); // the job is still ongoing, but here's some data about it.
// or
res.sendIgnored("We're not gonna do this one, sorry.", { hello: 'world' }); // doesnt meet the requirements to continue.
// or
res.sendFailed('We tried, but failed.', { hello: 'world' }); // we cant continue with this job.

/**
* Implement Axios Loggers
*/
this.axios.interceptors.request.use(envoyAxiosRequestLogger, envoyAxiosErrorLogger); // Request interceptor

this.axios.interceptors.response.use(envoyAxiosResponseLogger, envoyAxiosErrorLogger); // Response interceptor

```


## SDK Reference

Please see detailed documentation [here](docs/README.md).

### Contributing

We're happy to accept contributions. [Submit a PR](https://github.com/envoy/envoy-integrations-sdk-nodejs/pulls).
