require('dotenv').config();
const bodyParser = require('body-parser');
const EnvoyPluginSDK = require('./EnvoyPluginSDK');
const EnvoySignatureVerifier = require('./EnvoySignatureVerifier');

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

    const isVerified = signatureVerifier.verify(req, rawBody);
    req.envoy = new EnvoyPluginSDK(req.body, isVerified);
  };

  return bodyParser.json({ verify });
}

module.exports = middleware;
