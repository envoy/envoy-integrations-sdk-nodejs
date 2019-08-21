const bodyParser = require('body-parser');
const EnvoyAPI = require('./EnvoyAPI');
const EnvoyPluginSDK = require('./EnvoyPluginSDK');
const EnvoySignatureVerifier = require('./EnvoySignatureVerifier');

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
  let pluginAccessToken = null;
  let threshold = 0;

  return (req, res, next) => {

    json(req, res, async err => {

      if (err) {
        return next(err);
      }

      if (Date.now() > threshold) {
        const {
          access_token: accessToken,
          expires_in: expiresIn,
        } = await EnvoyAPI.login();
        pluginAccessToken = accessToken;
        threshold = Date.now() + (expiresIn * 1000) - (1000 * 60 * 10);
      }
      req.envoy = new EnvoyPluginSDK(req.body, req[VERIFIED], pluginAccessToken);
      next();
    });
  };
}

module.exports = middleware;
