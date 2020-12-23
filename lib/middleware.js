const bodyParser = require('body-parser');
const EnvoyAPI = require('./EnvoyAPI');
const EnvoyPluginSDK = require('./EnvoyPluginSDK');
const EnvoySignatureVerifier = require('./EnvoySignatureVerifier');
const HttpStatus = require('./HttpStatus');

const VERIFIED = Symbol('verified');

/**
 * Express/connect middleware.
 *
 * @callback connectMiddleware
 * @param req
 * @param res
 * @param {Function} next
 */

/**
 * @typedef {Object} EnvoyRequest
 * @property {EnvoyPluginSDK} envoy - the SDK
 */

/**
 * @typedef {Object} EnvoyResponse
 * @property {Function} sendOngoing
 * @property {Function} sendIgnored
 * @property {Function} sendFailed
 */

/**
 * Returns an instance of bodyParser.json,
 * which also verifies that the request came from Envoy.
 *
 * @param {SignatureVerifierOptions} [options]
 * @returns {connectMiddleware}
 */
function middleware(options) {

  const signatureVerifier = new EnvoySignatureVerifier(options);
  const verify = (req, res, rawBody) => {

    req[VERIFIED] = signatureVerifier.verify(req, rawBody);
  };
  const json = bodyParser.json({ verify });
  let accessToken = null;
  let threshold = 0;

  return (req, res, next) => {

    json(req, res, async err => {

      if (err) {
        return next(err);
      }
      try {
        const now = Date.now();
        if (now > threshold) {
          const {
            access_token: rawAccessToken,
            expires_in: expiresIn,
          } = await EnvoyAPI.login();
          accessToken = rawAccessToken;
          threshold = now + (expiresIn * 1000) - (1000 * 60 * 10);
        }

        /**
         * @type {EnvoyPluginSDK}
         */
        req.envoy = new EnvoyPluginSDK(req.body, req[VERIFIED], accessToken);
        /**
         * @param {object} [data]
         */
        res.sendOngoing = (data = {}) => {
          res.statusCode = HttpStatus.ONGOING;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };
        /**
         * @param {string} [message]
         * @param {object} [data]
         */
        res.sendIgnored = (message = '', data = {}) => {
          if (message && data.message) {
            console.warn('Data to be sent already has a message.');
          }
          res.statusCode = HttpStatus.IGNORED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(Object.assign({ message }, data)));
        };
        /**
         * @param {string} [message]
         * @param {object} [data]
         */
        res.sendFailed = (message = '', data = {}) => {
          if (message && data.message) {
            console.warn('Data to be sent already has a message.');
          }
          res.statusCode = HttpStatus.FAILED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(Object.assign({ message }, data)));
        };
        next();
      } catch (err) {
        next(err);
      }
    });
  };
}

module.exports = middleware;
