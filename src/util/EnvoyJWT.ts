import jwt, { SignOptions, Algorithm, VerifyOptions } from 'jsonwebtoken';
import { jwtSecret } from '../constants';

export type EnvoyJWTAlgorithm = Algorithm;
export type EnvoyJWTDecodeOptions = VerifyOptions;
/**
 * Helper to encode and decode JWTs.
 *
 * @category Helper
 * @category Request Object
 */
export default class EnvoyJWT {
  private secret: string;

  private algorithm: Algorithm;

  constructor(secret = jwtSecret, algorithm: EnvoyJWTAlgorithm = 'HS256') {
    if (!secret) {
      throw new Error('JWT secret missing. Have you set the `JWT_SECRET` environment variable?');
    }
    this.secret = secret;
    this.algorithm = algorithm;
  }

  encode(
    subject: string | number | null,
    expiresIn: string | number | null,
    payload: Record<string, unknown> = {},
  ): string {
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

  decode(token: string, options: EnvoyJWTDecodeOptions = {}): Record<string, unknown> {
    const { secret, algorithm } = this;
    return jwt.verify(token, secret, {
      ignoreExpiration: false,
      ignoreNotBefore: false,
      ...options,
      algorithms: [algorithm], // force the algorithm
    }) as Record<string, unknown>;
  }
}
