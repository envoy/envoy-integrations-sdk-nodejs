const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

/**
 * @typedef {Object} JWTOptions - https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
 */


class EnvoyJWT {

  /**
   *
   * @param {string} [secret=process.env.JWT_SECRET]
   * @param {string} [algorithm='HS256']
   */
  constructor(secret = process.env.JWT_SECRET, algorithm = 'HS256') {

    if (!secret) {
      throw new Error('JWT secret missing.');
    }
    this.secret = secret;
    this.algorithm = algorithm;
  }

  /**
   * Creates a JWT.
   *
   * @param {string|number|null} subject
   * @param {string|number|null} expiresIn - seconds or string like: https://github.com/zeit/ms
   * @param {{}} [payload]
   * @returns {Promise<string>}
   */
  encode(subject, expiresIn, payload = {}) {

    const { secret, algorithm } = this;
    const options = { algorithm };
    if (subject) {
      options.subject = subject;
    }
    if (expiresIn) {
      options.expiresIn = expiresIn;
    }

    return sign(payload, secret, options);
  }

  /**
   *
   * @param {string} token
   * @param {JWTOptions} [options]
   * @returns {Promise<{}>}
   */
  decode(token, options = {}) {

    const { secret, algorithm } = this;
    return verify(token, secret, Object.assign(
      {
        ignoreExpiration: false,
        ignoreNotBefore: false,
      },
      options,
      {
        algorithms: [algorithm], // force the algorithm
      },
    ));
  }
}

module.exports = EnvoyJWT;
