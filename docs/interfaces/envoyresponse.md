[@envoy/envoy-integrations-sdk](../README.md) / EnvoyResponse

# Interface: EnvoyResponse

Use to type your `res` object in Envoy request handlers.

## Hierarchy

- `Response`

  ↳ **EnvoyResponse**

## Table of contents

### Properties

- [app](envoyresponse.md#app)
- [charset](envoyresponse.md#charset)
- [chunkedEncoding](envoyresponse.md#chunkedencoding)
- [connection](envoyresponse.md#connection)
- [destroyed](envoyresponse.md#destroyed)
- [finished](envoyresponse.md#finished)
- [headersSent](envoyresponse.md#headerssent)
- [json](envoyresponse.md#json)
- [jsonp](envoyresponse.md#jsonp)
- [locals](envoyresponse.md#locals)
- [req](envoyresponse.md#req)
- [send](envoyresponse.md#send)
- [sendDate](envoyresponse.md#senddate)
- [sendFailed](envoyresponse.md#sendfailed)
- [sendIgnored](envoyresponse.md#sendignored)
- [sendOngoing](envoyresponse.md#sendongoing)
- [shouldKeepAlive](envoyresponse.md#shouldkeepalive)
- [socket](envoyresponse.md#socket)
- [statusCode](envoyresponse.md#statuscode)
- [statusMessage](envoyresponse.md#statusmessage)
- [useChunkedEncodingByDefault](envoyresponse.md#usechunkedencodingbydefault)
- [writable](envoyresponse.md#writable)
- [writableCorked](envoyresponse.md#writablecorked)
- [writableEnded](envoyresponse.md#writableended)
- [writableFinished](envoyresponse.md#writablefinished)
- [writableHighWaterMark](envoyresponse.md#writablehighwatermark)
- [writableLength](envoyresponse.md#writablelength)
- [writableObjectMode](envoyresponse.md#writableobjectmode)

### Methods

- [\_construct](envoyresponse.md#_construct)
- [\_destroy](envoyresponse.md#_destroy)
- [\_final](envoyresponse.md#_final)
- [\_write](envoyresponse.md#_write)
- [\_writev](envoyresponse.md#_writev)
- [addListener](envoyresponse.md#addlistener)
- [addTrailers](envoyresponse.md#addtrailers)
- [append](envoyresponse.md#append)
- [assignSocket](envoyresponse.md#assignsocket)
- [attachment](envoyresponse.md#attachment)
- [clearCookie](envoyresponse.md#clearcookie)
- [contentType](envoyresponse.md#contenttype)
- [cookie](envoyresponse.md#cookie)
- [cork](envoyresponse.md#cork)
- [destroy](envoyresponse.md#destroy)
- [detachSocket](envoyresponse.md#detachsocket)
- [download](envoyresponse.md#download)
- [emit](envoyresponse.md#emit)
- [end](envoyresponse.md#end)
- [eventNames](envoyresponse.md#eventnames)
- [flushHeaders](envoyresponse.md#flushheaders)
- [format](envoyresponse.md#format)
- [get](envoyresponse.md#get)
- [getHeader](envoyresponse.md#getheader)
- [getHeaderNames](envoyresponse.md#getheadernames)
- [getHeaders](envoyresponse.md#getheaders)
- [getMaxListeners](envoyresponse.md#getmaxlisteners)
- [hasHeader](envoyresponse.md#hasheader)
- [header](envoyresponse.md#header)
- [links](envoyresponse.md#links)
- [listenerCount](envoyresponse.md#listenercount)
- [listeners](envoyresponse.md#listeners)
- [location](envoyresponse.md#location)
- [off](envoyresponse.md#off)
- [on](envoyresponse.md#on)
- [once](envoyresponse.md#once)
- [pipe](envoyresponse.md#pipe)
- [prependListener](envoyresponse.md#prependlistener)
- [prependOnceListener](envoyresponse.md#prependoncelistener)
- [rawListeners](envoyresponse.md#rawlisteners)
- [redirect](envoyresponse.md#redirect)
- [removeAllListeners](envoyresponse.md#removealllisteners)
- [removeHeader](envoyresponse.md#removeheader)
- [removeListener](envoyresponse.md#removelistener)
- [render](envoyresponse.md#render)
- [sendFile](envoyresponse.md#sendfile)
- [sendStatus](envoyresponse.md#sendstatus)
- [sendfile](envoyresponse.md#sendfile)
- [set](envoyresponse.md#set)
- [setDefaultEncoding](envoyresponse.md#setdefaultencoding)
- [setHeader](envoyresponse.md#setheader)
- [setMaxListeners](envoyresponse.md#setmaxlisteners)
- [setTimeout](envoyresponse.md#settimeout)
- [status](envoyresponse.md#status)
- [type](envoyresponse.md#type)
- [uncork](envoyresponse.md#uncork)
- [vary](envoyresponse.md#vary)
- [write](envoyresponse.md#write)
- [writeContinue](envoyresponse.md#writecontinue)
- [writeHead](envoyresponse.md#writehead)
- [writeProcessing](envoyresponse.md#writeprocessing)

## Properties

### app

• **app**: `Application`

#### Inherited from

Response.app

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1005

___

### charset

• **charset**: `string`

#### Inherited from

Response.charset

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:994

___

### chunkedEncoding

• **chunkedEncoding**: `boolean`

#### Inherited from

Response.chunkedEncoding

#### Defined in

node_modules/@types/node/http.d.ts:161

___

### connection

• `Readonly` **connection**: ``null`` \| `Socket`

**`deprecated`** Use `socket` instead.

#### Inherited from

Response.connection

#### Defined in

node_modules/@types/node/http.d.ts:173

___

### destroyed

• **destroyed**: `boolean`

#### Inherited from

Response.destroyed

#### Defined in

node_modules/@types/node/stream.d.ts:150

___

### finished

• **finished**: `boolean`

**`deprecated`** Use `writableEnded` instead.

#### Inherited from

Response.finished

#### Defined in

node_modules/@types/node/http.d.ts:168

___

### headersSent

• **headersSent**: `boolean`

#### Inherited from

Response.headersSent

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:902

___

### json

• **json**: `Send`<any, [EnvoyResponse](envoyresponse.md)\>

Send JSON response.

Examples:

    res.json(null);
    res.json({ user: 'tj' });
    res.status(500).json('oh noes!');
    res.status(404).json('I dont have that');

#### Inherited from

Response.json

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:705

___

### jsonp

• **jsonp**: `Send`<any, [EnvoyResponse](envoyresponse.md)\>

Send JSON response with JSONP callback support.

Examples:

    res.jsonp(null);
    res.jsonp({ user: 'tj' });
    res.status(500).jsonp('oh noes!');
    res.status(404).jsonp('I dont have that');

#### Inherited from

Response.jsonp

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:717

___

### locals

• **locals**: `Record`<string, any\>

#### Inherited from

Response.locals

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:992

___

### req

• **req**: `Request`<ParamsDictionary, any, any, ParsedQs, Record<string, any\>\>

After middleware.init executed, Response will contain req property
See: express/lib/middleware/init.js

#### Inherited from

Response.req

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1022

___

### send

• **send**: `Send`<any, [EnvoyResponse](envoyresponse.md)\>

Send a response.

Examples:

    res.send(new Buffer('wahoo'));
    res.send({ some: 'json' });
    res.send('<p>some html</p>');
    res.status(404).send('Sorry, cant find that');

#### Inherited from

Response.send

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:693

___

### sendDate

• **sendDate**: `boolean`

#### Inherited from

Response.sendDate

#### Defined in

node_modules/@types/node/http.d.ts:164

___

### sendFailed

• **sendFailed**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

#### Type declaration

▸ (`message`, `debugInfo?`, ...`attachments`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `debugInfo?` | `unknown` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

##### Returns

`void`

#### Defined in

[src/EnvoyResponse.ts:10](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyResponse.ts#L10)

___

### sendIgnored

• **sendIgnored**: (`message`: `string`, `debugInfo?`: `unknown`, ...`attachments`: `EnvoyPluginJobAttachment`[]) => `void`

#### Type declaration

▸ (`message`, `debugInfo?`, ...`attachments`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `debugInfo?` | `unknown` |
| `...attachments` | `EnvoyPluginJobAttachment`[] |

##### Returns

`void`

#### Defined in

[src/EnvoyResponse.ts:9](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyResponse.ts#L9)

___

### sendOngoing

• **sendOngoing**: (`debugInfo?`: `unknown`) => `void`

#### Type declaration

▸ (`debugInfo?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `debugInfo?` | `unknown` |

##### Returns

`void`

#### Defined in

[src/EnvoyResponse.ts:8](https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/2bdd026/src/EnvoyResponse.ts#L8)

___

### shouldKeepAlive

• **shouldKeepAlive**: `boolean`

#### Inherited from

Response.shouldKeepAlive

#### Defined in

node_modules/@types/node/http.d.ts:162

___

### socket

• `Readonly` **socket**: ``null`` \| `Socket`

#### Inherited from

Response.socket

#### Defined in

node_modules/@types/node/http.d.ts:174

___

### statusCode

• **statusCode**: `number`

#### Inherited from

Response.statusCode

#### Defined in

node_modules/@types/node/http.d.ts:191

___

### statusMessage

• **statusMessage**: `string`

#### Inherited from

Response.statusMessage

#### Defined in

node_modules/@types/node/http.d.ts:192

___

### useChunkedEncodingByDefault

• **useChunkedEncodingByDefault**: `boolean`

#### Inherited from

Response.useChunkedEncodingByDefault

#### Defined in

node_modules/@types/node/http.d.ts:163

___

### writable

• `Readonly` **writable**: `boolean`

#### Inherited from

Response.writable

#### Defined in

node_modules/@types/node/stream.d.ts:143

___

### writableCorked

• `Readonly` **writableCorked**: `number`

#### Inherited from

Response.writableCorked

#### Defined in

node_modules/@types/node/stream.d.ts:149

___

### writableEnded

• `Readonly` **writableEnded**: `boolean`

#### Inherited from

Response.writableEnded

#### Defined in

node_modules/@types/node/stream.d.ts:144

___

### writableFinished

• `Readonly` **writableFinished**: `boolean`

#### Inherited from

Response.writableFinished

#### Defined in

node_modules/@types/node/stream.d.ts:145

___

### writableHighWaterMark

• `Readonly` **writableHighWaterMark**: `number`

#### Inherited from

Response.writableHighWaterMark

#### Defined in

node_modules/@types/node/stream.d.ts:146

___

### writableLength

• `Readonly` **writableLength**: `number`

#### Inherited from

Response.writableLength

#### Defined in

node_modules/@types/node/stream.d.ts:147

___

### writableObjectMode

• `Readonly` **writableObjectMode**: `boolean`

#### Inherited from

Response.writableObjectMode

#### Defined in

node_modules/@types/node/stream.d.ts:148

## Methods

### \_construct

▸ `Optional` **_construct**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Response.\_construct

#### Defined in

node_modules/@types/node/stream.d.ts:154

___

### \_destroy

▸ **_destroy**(`error`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | ``null`` \| `Error` |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Response.\_destroy

#### Defined in

node_modules/@types/node/stream.d.ts:155

___

### \_final

▸ **_final**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Response.\_final

#### Defined in

node_modules/@types/node/stream.d.ts:156

___

### \_write

▸ **_write**(`chunk`, `encoding`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | `BufferEncoding` |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Response.\_write

#### Defined in

node_modules/@types/node/stream.d.ts:152

___

### \_writev

▸ `Optional` **_writev**(`chunks`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunks` | { `chunk`: `any` ; `encoding`: `BufferEncoding`  }[] |
| `callback` | (`error?`: ``null`` \| `Error`) => `void` |

#### Returns

`void`

#### Inherited from

Response.\_writev

#### Defined in

node_modules/@types/node/stream.d.ts:153

___

### addListener

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

Event emitter
The defined events on documents including:
1. close
2. drain
3. error
4. finish
5. pipe
6. unpipe

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:177

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:178

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:179

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:180

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:181

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:182

▸ **addListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.addListener

#### Defined in

node_modules/@types/node/stream.d.ts:183

___

### addTrailers

▸ **addTrailers**(`headers`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `OutgoingHttpHeaders` \| readonly [`string`, `string`][] |

#### Returns

`void`

#### Inherited from

Response.addTrailers

#### Defined in

node_modules/@types/node/http.d.ts:185

___

### append

▸ **append**(`field`, `value?`): [EnvoyResponse](envoyresponse.md)

Appends the specified value to the HTTP response header field.
If the header is not already set, it creates the header with the specified value.
The value parameter can be a string or an array.

Note: calling res.set() after res.append() will reset the previously-set header value.

**`since`** 4.11.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `value?` | `string` \| `string`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.append

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1016

___

### assignSocket

▸ **assignSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Inherited from

Response.assignSocket

#### Defined in

node_modules/@types/node/http.d.ts:196

___

### attachment

▸ **attachment**(`filename?`): [EnvoyResponse](envoyresponse.md)

Set _Content-Disposition_ header to _attachment_ with optional `filename`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `filename?` | `string` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.attachment

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:881

___

### clearCookie

▸ **clearCookie**(`name`, `options?`): [EnvoyResponse](envoyresponse.md)

Clear cookie `name`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `options?` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.clearCookie

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:908

___

### contentType

▸ **contentType**(`type`): [EnvoyResponse](envoyresponse.md)

Set _Content-Type_ response header with `type` through `mime.lookup()`
when it does not contain "/", or set the Content-Type to `type` otherwise.

Examples:

    res.type('.html');
    res.type('html');
    res.type('json');
    res.type('application/json');
    res.type('png');

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.contentType

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:808

___

### cookie

▸ **cookie**(`name`, `val`, `options`): [EnvoyResponse](envoyresponse.md)

Set cookie `name` to `val`, with the given `options`.

Options:

   - `maxAge`   max-age in milliseconds, converted to `expires`
   - `signed`   sign the cookie
   - `path`     defaults to "/"

Examples:

   // "Remember Me" for 15 minutes
   res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });

   // save as above
   res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `val` | `string` |
| `options` | `CookieOptions` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.cookie

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:927

▸ **cookie**(`name`, `val`, `options`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `val` | `any` |
| `options` | `CookieOptions` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.cookie

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:928

▸ **cookie**(`name`, `val`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `val` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.cookie

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:929

___

### cork

▸ **cork**(): `void`

#### Returns

`void`

#### Inherited from

Response.cork

#### Defined in

node_modules/@types/node/stream.d.ts:163

___

### destroy

▸ **destroy**(`error?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `Error` |

#### Returns

`void`

#### Inherited from

Response.destroy

#### Defined in

node_modules/@types/node/stream.d.ts:165

___

### detachSocket

▸ **detachSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Inherited from

Response.detachSocket

#### Defined in

node_modules/@types/node/http.d.ts:197

___

### download

▸ **download**(`path`, `fn?`): `void`

Transfer the file at the given `path` as an attachment.

Optionally providing an alternate attachment `filename`,
and optional callback `fn(err)`. The callback is invoked
when the data transfer is complete, or when an error has
ocurred. Be sure to check `res.headersSent` if you plan to respond.

The optional options argument passes through to the underlying
res.sendFile() call, and takes the exact same parameters.

This method uses `res.sendfile()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `fn?` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.download

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:792

▸ **download**(`path`, `filename`, `fn?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `filename` | `string` |
| `fn?` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.download

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:793

▸ **download**(`path`, `filename`, `options`, `fn?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `filename` | `string` |
| `options` | `any` |
| `fn?` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.download

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:794

___

### emit

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:185

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:186

▸ **emit**(`event`, `err`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `err` | `Error` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:187

▸ **emit**(`event`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:188

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `src` | `Readable` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:189

▸ **emit**(`event`, `src`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `src` | `Readable` |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:190

▸ **emit**(`event`, ...`args`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

Response.emit

#### Defined in

node_modules/@types/node/stream.d.ts:191

___

### end

▸ **end**(`cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Response.end

#### Defined in

node_modules/@types/node/stream.d.ts:160

▸ **end**(`chunk`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Response.end

#### Defined in

node_modules/@types/node/stream.d.ts:161

▸ **end**(`chunk`, `encoding`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | `BufferEncoding` |
| `cb?` | () => `void` |

#### Returns

`void`

#### Inherited from

Response.end

#### Defined in

node_modules/@types/node/stream.d.ts:162

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

Response.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:87

___

### flushHeaders

▸ **flushHeaders**(): `void`

#### Returns

`void`

#### Inherited from

Response.flushHeaders

#### Defined in

node_modules/@types/node/http.d.ts:186

___

### format

▸ **format**(`obj`): [EnvoyResponse](envoyresponse.md)

Respond to the Acceptable formats using an `obj`
of mime-type callbacks.

This method uses `req.accepted`, an array of
acceptable types ordered by their quality values.
When "Accept" is not present the _first_ callback
is invoked, otherwise the first match is used. When
no match is performed the server responds with
406 "Not Acceptable".

Content-Type is set for you, however if you choose
you may alter this within the callback using `res.type()`
or `res.set('Content-Type', ...)`.

   res.format({
     'text/plain': function(){
       res.send('hey');
     },

     'text/html': function(){
       res.send('<p>hey</p>');
     },

     'appliation/json': function(){
       res.send({ message: 'hey' });
     }
   });

In addition to canonicalized MIME types you may
also use extnames mapped to these types:

   res.format({
     text: function(){
       res.send('hey');
     },

     html: function(){
       res.send('<p>hey</p>');
     },

     json: function(){
       res.send({ message: 'hey' });
     }
   });

By default Express passes an `Error`
with a `.status` of 406 to `next(err)`
if a match is not made. If you provide
a `.default` callback it will be invoked
instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.format

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:876

___

### get

▸ **get**(`field`): `string`

Get value for header `field`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |

#### Returns

`string`

#### Inherited from

Response.get

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:905

___

### getHeader

▸ **getHeader**(`name`): `undefined` \| `string` \| `number` \| `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| `string` \| `number` \| `string`[]

#### Inherited from

Response.getHeader

#### Defined in

node_modules/@types/node/http.d.ts:180

___

### getHeaderNames

▸ **getHeaderNames**(): `string`[]

#### Returns

`string`[]

#### Inherited from

Response.getHeaderNames

#### Defined in

node_modules/@types/node/http.d.ts:182

___

### getHeaders

▸ **getHeaders**(): `OutgoingHttpHeaders`

#### Returns

`OutgoingHttpHeaders`

#### Inherited from

Response.getHeaders

#### Defined in

node_modules/@types/node/http.d.ts:181

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

Response.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:79

___

### hasHeader

▸ **hasHeader**(`name`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`boolean`

#### Inherited from

Response.hasHeader

#### Defined in

node_modules/@types/node/http.d.ts:183

___

### header

▸ **header**(`field`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.header

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:898

▸ **header**(`field`, `value?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `value?` | `string` \| `string`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.header

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:899

___

### links

▸ **links**(`links`): [EnvoyResponse](envoyresponse.md)

Set Link header field with the given `links`.

Examples:

   res.links({
     next: 'http://api.example.com/users?page=2',
     last: 'http://api.example.com/users?page=5'
   });

#### Parameters

| Name | Type |
| :------ | :------ |
| `links` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.links

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:681

___

### listenerCount

▸ **listenerCount**(`event`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`number`

#### Inherited from

Response.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:83

___

### listeners

▸ **listeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Response.listeners

#### Defined in

node_modules/@types/node/events.d.ts:80

___

### location

▸ **location**(`url`): [EnvoyResponse](envoyresponse.md)

Set the location header to `url`.

The given `url` can also be the name of a mapped url, for
example by default express supports "back" which redirects
to the _Referrer_ or _Referer_ headers or "/".

Examples:

   res.location('/foo/bar').;
   res.location('http://example.com');
   res.location('../login'); // /blog/post/1 -> /blog/login

Mounting:

  When an application is mounted and `res.location()`
  is given a path that does _not_ lead with "/" it becomes
  relative to the mount-point. For example if the application
  is mounted at "/blog", the following would become "/blog/login".

     res.location('login');

  While the leading slash would result in a location of "/login":

     res.location('/login');

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.location

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:957

___

### off

▸ **off**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.off

#### Defined in

node_modules/@types/node/events.d.ts:76

___

### on

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:193

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:194

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:195

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:196

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:197

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:198

▸ **on**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.on

#### Defined in

node_modules/@types/node/stream.d.ts:199

___

### once

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:201

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:202

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:203

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:204

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:205

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:206

▸ **once**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.once

#### Defined in

node_modules/@types/node/stream.d.ts:207

___

### pipe

▸ **pipe**<T\>(`destination`, `options?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T`: `WritableStream`<T\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `destination` | `T` |
| `options?` | `Object` |
| `options.end?` | `boolean` |

#### Returns

`T`

#### Inherited from

Response.pipe

#### Defined in

node_modules/@types/node/stream.d.ts:6

___

### prependListener

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:209

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:210

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:211

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:212

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:213

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:214

▸ **prependListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependListener

#### Defined in

node_modules/@types/node/stream.d.ts:215

___

### prependOnceListener

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:217

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:218

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:219

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:220

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:221

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:222

▸ **prependOnceListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.prependOnceListener

#### Defined in

node_modules/@types/node/stream.d.ts:223

___

### rawListeners

▸ **rawListeners**(`event`): `Function`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

Response.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:81

___

### redirect

▸ **redirect**(`url`): `void`

Redirect to the given `url` with optional response `status`
defaulting to 302.

The resulting `url` is determined by `res.location()`, so
it will play nicely with mounted apps, relative paths,
`"back"` etc.

Examples:

   res.redirect('/foo/bar');
   res.redirect('http://example.com');
   res.redirect(301, 'http://example.com');
   res.redirect('http://example.com', 301);
   res.redirect('../login'); // /blog/post/1 -> /blog/login

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Inherited from

Response.redirect

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:975

▸ **redirect**(`status`, `url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `number` |
| `url` | `string` |

#### Returns

`void`

#### Inherited from

Response.redirect

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:976

▸ **redirect**(`url`, `status`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `status` | `number` |

#### Returns

`void`

#### Inherited from

Response.redirect

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:977

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:77

___

### removeHeader

▸ **removeHeader**(`name`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`void`

#### Inherited from

Response.removeHeader

#### Defined in

node_modules/@types/node/http.d.ts:184

___

### removeListener

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"close"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:225

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"drain"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:226

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"error"`` |
| `listener` | (`err`: `Error`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:227

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"finish"`` |
| `listener` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:228

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"pipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:229

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"unpipe"`` |
| `listener` | (`src`: `Readable`) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:230

▸ **removeListener**(`event`, `listener`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.removeListener

#### Defined in

node_modules/@types/node/stream.d.ts:231

___

### render

▸ **render**(`view`, `options?`, `callback?`): `void`

Render `view` with the given `options` and optional callback `fn`.
When a callback function is given a response will _not_ be made
automatically, otherwise a response of _200_ and _text/html_ is given.

Options:

 - `cache`     boolean hinting to the engine it should cache
 - `filename`  filename of the view being rendered

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `string` |
| `options?` | `object` |
| `callback?` | (`err`: `Error`, `html`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Response.render

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:989

▸ **render**(`view`, `callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `string` |
| `callback?` | (`err`: `Error`, `html`: `string`) => `void` |

#### Returns

`void`

#### Inherited from

Response.render

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:990

___

### sendFile

▸ **sendFile**(`path`, `fn?`): `void`

Transfer the file at the given `path`.

Automatically sets the _Content-Type_ response header field.
The callback `fn(err)` is invoked when the transfer is complete
or when an error occurs. Be sure to check `res.headersSent`
if you wish to attempt responding, as the header and some data
may have already been transferred.

Options:

  - `maxAge`   defaulting to 0 (can be string converted by `ms`)
  - `root`     root directory for relative filenames
  - `headers`  object of headers to serve with file
  - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them

Other options are passed along to `send`.

Examples:

 The following example illustrates how `res.sendFile()` may
 be used as an alternative for the `static()` middleware for
 dynamic situations. The code backing `res.sendFile()` is actually
 the same code, so HTTP cache support etc is identical.

    app.get('/user/:uid/photos/:file', function(req, res){
      var uid = req.params.uid
        , file = req.params.file;

      req.user.mayViewFilesFrom(uid, function(yes){
        if (yes) {
          res.sendFile('/uploads/' + uid + '/' + file);
        } else {
          res.send(403, 'Sorry! you cant see that.');
        }
      });
    });

**`api`** public

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `fn?` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.sendFile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:759

▸ **sendFile**(`path`, `options`, `fn?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options` | `any` |
| `fn?` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.sendFile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:760

___

### sendStatus

▸ **sendStatus**(`code`): [EnvoyResponse](envoyresponse.md)

Set the response HTTP status code to `statusCode` and send its string representation as the response body.

**`link`** http://expressjs.com/4x/api.html#res.sendStatus

Examples:

   res.sendStatus(200); // equivalent to res.status(200).send('OK')
   res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
   res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
   res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `number` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.sendStatus

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:669

___

### sendfile

▸ **sendfile**(`path`): `void`

**`deprecated`** Use sendFile instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`void`

#### Inherited from

Response.sendfile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:765

▸ **sendfile**(`path`, `options`): `void`

**`deprecated`** Use sendFile instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options` | `any` |

#### Returns

`void`

#### Inherited from

Response.sendfile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:769

▸ **sendfile**(`path`, `fn`): `void`

**`deprecated`** Use sendFile instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `fn` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.sendfile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:773

▸ **sendfile**(`path`, `options`, `fn`): `void`

**`deprecated`** Use sendFile instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `options` | `any` |
| `fn` | `Errback` |

#### Returns

`void`

#### Inherited from

Response.sendfile

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:777

___

### set

▸ **set**(`field`): [EnvoyResponse](envoyresponse.md)

Set header `field` to `val`, or pass
an object of header fields.

Examples:

   res.set('Foo', ['bar', 'baz']);
   res.set('Accept', 'application/json');
   res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });

Aliased as `res.header()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `any` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.set

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:895

▸ **set**(`field`, `value?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |
| `value?` | `string` \| `string`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.set

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:896

___

### setDefaultEncoding

▸ **setDefaultEncoding**(`encoding`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoding` | `BufferEncoding` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.setDefaultEncoding

#### Defined in

node_modules/@types/node/stream.d.ts:159

___

### setHeader

▸ **setHeader**(`name`, `value`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` \| `number` \| readonly `string`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.setHeader

#### Defined in

node_modules/@types/node/http.d.ts:179

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:78

___

### setTimeout

▸ **setTimeout**(`msecs`, `callback?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msecs` | `number` |
| `callback?` | () => `void` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.setTimeout

#### Defined in

node_modules/@types/node/http.d.ts:178

___

### status

▸ **status**(`code`): [EnvoyResponse](envoyresponse.md)

Set status `code`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `number` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.status

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:656

___

### type

▸ **type**(`type`): [EnvoyResponse](envoyresponse.md)

Set _Content-Type_ response header with `type` through `mime.lookup()`
when it does not contain "/", or set the Content-Type to `type` otherwise.

Examples:

    res.type('.html');
    res.type('html');
    res.type('json');
    res.type('application/json');
    res.type('png');

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.type

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:822

___

### uncork

▸ **uncork**(): `void`

#### Returns

`void`

#### Inherited from

Response.uncork

#### Defined in

node_modules/@types/node/stream.d.ts:164

___

### vary

▸ **vary**(`field`): [EnvoyResponse](envoyresponse.md)

Adds the field to the Vary response header, if it is not there already.
Examples:

    res.vary('User-Agent').render('docs');

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | `string` |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.vary

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1003

___

### write

▸ **write**(`chunk`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `cb?` | (`error`: `undefined` \| ``null`` \| `Error`) => `void` |

#### Returns

`boolean`

#### Inherited from

Response.write

#### Defined in

node_modules/@types/node/stream.d.ts:157

▸ **write**(`chunk`, `encoding`, `cb?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chunk` | `any` |
| `encoding` | `BufferEncoding` |
| `cb?` | (`error`: `undefined` \| ``null`` \| `Error`) => `void` |

#### Returns

`boolean`

#### Inherited from

Response.write

#### Defined in

node_modules/@types/node/stream.d.ts:158

___

### writeContinue

▸ **writeContinue**(`callback?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback?` | () => `void` |

#### Returns

`void`

#### Inherited from

Response.writeContinue

#### Defined in

node_modules/@types/node/http.d.ts:200

___

### writeHead

▸ **writeHead**(`statusCode`, `reasonPhrase?`, `headers?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusCode` | `number` |
| `reasonPhrase?` | `string` |
| `headers?` | `OutgoingHttpHeaders` \| `OutgoingHttpHeader`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.writeHead

#### Defined in

node_modules/@types/node/http.d.ts:201

▸ **writeHead**(`statusCode`, `headers?`): [EnvoyResponse](envoyresponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `statusCode` | `number` |
| `headers?` | `OutgoingHttpHeaders` \| `OutgoingHttpHeader`[] |

#### Returns

[EnvoyResponse](envoyresponse.md)

#### Inherited from

Response.writeHead

#### Defined in

node_modules/@types/node/http.d.ts:202

___

### writeProcessing

▸ **writeProcessing**(): `void`

#### Returns

`void`

#### Inherited from

Response.writeProcessing

#### Defined in

node_modules/@types/node/http.d.ts:203
