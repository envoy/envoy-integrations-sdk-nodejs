const util = require('util');
const jwt = require('jsonwebtoken');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

class EnvoyJWT {

  constructor(secret = process.env.JWT_SECRET, algorithm = 'HS256') {

    if (!secret) {
      throw new Error('JWT secret missing.');
    }
    this.secret = secret;
    this.algorithm = algorithm;
  }

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

  decode(token, options = {}) {

    const { secret, algorithm } = this;
    return verify(token, secret, Object.assign({
      algorithms: [algorithm],
      ignoreExpiration: false,
      ignoreNotBefore: false,
    }, options));
  }
}

module.exports = EnvoyJWT;
