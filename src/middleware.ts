import bodyParser from 'body-parser';
import { Response, NextFunction } from 'express';

import HttpStatus from './HttpStatus';
import EnvoySignatureVerifier, { EnvoySignatureVerifierOptions } from './EnvoySignatureVerifier';
import EnvoyRequest, { VERIFIED, VerifiedRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';
import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyPluginAPI from './EnvoyPluginAPI';

export type EnvoyMiddleware = (req: EnvoyRequest, res: EnvoyResponse, next: NextFunction) => void;

/**
 * Sets up an `EnvoyPluginSDK` object in the path `req.envoy`.
 * Modifies the `res` object to include Envoy's helpers, per `EnvoyResponse`.
 *
 * Also verifies that the request is coming from Envoy,
 * as well as managing the plugin access token lifecycle.
 */
export default function middleware(options?: EnvoySignatureVerifierOptions): EnvoyMiddleware {
  const signatureVerifier = new EnvoySignatureVerifier(options);
  const verify = (req: VerifiedRequest, res: Response, rawBody: Buffer) => {
    req[VERIFIED] = signatureVerifier.verify(req, rawBody);
  };
  const json = bodyParser.json({ verify });
  let accessToken: string | null = null;
  let threshold = 0;

  return (req: EnvoyRequest, res: EnvoyResponse, next: NextFunction) => {
    json(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      try {
        const now = Date.now();
        if (now > threshold) {
          const { access_token: rawAccessToken, expires_in: expiresIn } = await EnvoyPluginAPI.login();
          accessToken = rawAccessToken;
          threshold = now + (expiresIn * 1000) - (1000 * 60 * 10);
        }

        req.envoy = new EnvoyPluginSDK(req.body, req[VERIFIED], accessToken);

        /**
         * Respond with "ongoing" for long jobs.
         */
        res.sendOngoing = (debugInfo: unknown = {}) => {
          res.statusCode = HttpStatus.ONGOING;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ debugInfo }));
        };

        /**
         * Respond with "ignored" if no action will be performed.
         */
        res.sendIgnored = (message = '', debugInfo: unknown = {}, ...attachments: Array<EnvoyPluginJobAttachment>) => {
          res.statusCode = HttpStatus.IGNORED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message, debugInfo, attachments }));
        };

        /**
         * Respond with "failed" in case of errors.
         */
        res.sendFailed = (message = '', debugInfo: unknown = {}, ...attachments: Array<EnvoyPluginJobAttachment>) => {
          res.statusCode = HttpStatus.FAILED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message, debugInfo, attachments }));
        };
        next();
      } catch (error) {
        next(error);
      }
    });
  };
}
