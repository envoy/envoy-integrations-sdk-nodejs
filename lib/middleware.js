const bodyParser = require('body-parser');
const EnvoyPluginSDK = require('./EnvoyPluginSDK');
const EnvoySignatureVerifier = require('./EnvoySignatureVerifier');

const isVerified = Symbol('is verified');

/**
 *
 * @param {{}} [options]
 * @returns {[]}
 */
function middleware(options) {

  const signatureVerifier = new EnvoySignatureVerifier(options);

  const verify = (req, res, rawBody) => {

    req[isVerified] = signatureVerifier.verify(req, rawBody);
  };

  const sdk = (req, res, next) => {

    /**
     * @type {EnvoyPluginSDK}
     */
    req.envoy = new EnvoyPluginSDK(req.body, req[isVerified]);
    next();
  };

  return [bodyParser.json({ verify }), sdk];
}

module.exports = middleware;
