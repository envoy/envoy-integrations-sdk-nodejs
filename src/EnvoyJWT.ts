import jwt, { SignOptions, Algorithm, VerifyOptions } from 'jsonwebtoken';
import { jwtSecret } from './constants';

export default class EnvoyJWT {
  private secret: string;

  private algorithm: Algorithm;

  constructor(secret = jwtSecret, algorithm: Algorithm = 'HS256') {
    if (!secret) {
      throw new Error('JWT secret missing.');
    }
    this.secret = secret;
    this.algorithm = algorithm;
  }

  encode(subject: string | number | null | undefined, expiresIn: string | number | null | undefined, payload = {}) {
    const { secret, algorithm } = this;
    const options: SignOptions = { algorithm };
    if (subject) {
      options.subject = `${subject}`;
    }
    if (expiresIn) {
      options.expiresIn = expiresIn;
    }

    return jwt.sign(payload, secret, options);
  }

  decode(token: string, options: VerifyOptions = {}) {
    const { secret, algorithm } = this;
    return jwt.verify(token, secret, {
      ignoreExpiration: false,
      ignoreNotBefore: false,
      ...options,
      algorithms: [algorithm], // force the algorithm
    });
  }
}
