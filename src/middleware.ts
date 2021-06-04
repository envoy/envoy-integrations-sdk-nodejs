import bodyParser from 'body-parser';
import { Response, NextFunction } from 'express';
import EnvoySignatureVerifier, { EnvoySignatureVerifierOptions } from './EnvoySignatureVerifier';
import EnvoyAPI from './EnvoyAPI';
import EnvoyPluginSDK from './EnvoyPluginSDK';

import HttpStatus from './HttpStatus';
import EnvoyRequest, { VERIFIED, VerifiedRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

export default function middleware(options: EnvoySignatureVerifierOptions) {
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
          const { access_token: rawAccessToken, expires_in: expiresIn } = await EnvoyAPI.login();
          accessToken = rawAccessToken;
          threshold = now + (expiresIn * 1000) - (1000 * 60 * 10);
        }

        req.envoy = new EnvoyPluginSDK(req.body, req[VERIFIED], accessToken);

        /**
         * Respond with "ongoing" for long jobs.
         */
        res.sendOngoing = (data = {}) => {
          res.statusCode = HttpStatus.ONGOING;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        };

        /**
         * Respond with "ignored" if no action will be performed.
         */
        res.sendIgnored = (message = '', data = {}) => {
          res.statusCode = HttpStatus.IGNORED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ...(data || {}), message }));
        };

        /**
         * Respond with "failed" in case of errors.
         */
        res.sendFailed = (message = '', data = {}) => {
          res.statusCode = HttpStatus.FAILED;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ...(data || {}), message }));
        };
        next();
      } catch (error) {
        next(error);
      }
    });
  };
}
