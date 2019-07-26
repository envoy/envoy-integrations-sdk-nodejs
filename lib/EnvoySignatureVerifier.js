const crypto = require('crypto');

const defaultOptions = {
  algorithm: 'sha256',
  encoding: 'base64',
  secret: process.env.ENVOY_CLIENT_SECRET,
  header: 'x-envoy-signature',
};

class EnvoySignatureVerifier {

  constructor(options = defaultOptions) {

    this.options = Object.assign({}, defaultOptions, options);

    if (!this.options.secret) {
      throw new Error('No client secret found in the ENVOY_CLIENT_SECRET environment variable.');
    }
  }

  /**
   * Verifies that the signature provided matches the request body.
   *
   * @param req
   * @param rawBody
   * @returns {boolean|*}
   */
  verify(req, rawBody) {

    const {
      algorithm,
      encoding,
      secret,
      header,
    } = this.options;

    if (!req.headers[header]) {
      return false;
    }
    const receivedDigest = req.headers[header];
    const computedHmac = crypto.createHmac(algorithm, secret);
    computedHmac.update(rawBody);

    return crypto.timingSafeEqual(
      Buffer.from(receivedDigest),
      Buffer.from(computedHmac.digest(encoding)),
    );
  }
}

module.exports = EnvoySignatureVerifier;
