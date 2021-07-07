import bodyParser from 'body-parser';
import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
  RequestHandler,
} from 'express';

import HttpStatus from '../internal/HttpStatus';
import EnvoySignatureVerifier, { EnvoySignatureVerifierOptions } from '../util/EnvoySignatureVerifier';
import EnvoyRequest, { VERIFIED, VerifiedRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';
import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyPluginAPI from './EnvoyPluginAPI';

/**
 * Sets up an {@link EnvoyPluginSDK} object in the path `req.envoy`.
 * Modifies the `res` object to include Envoy's helpers, per {@link EnvoyResponse}.
 *
 * Also verifies that the request is coming from Envoy,
 * as well as managing the plugin access token lifecycle.
 *
 * @category Middleware
 */
export function envoyMiddleware(options?: EnvoySignatureVerifierOptions): RequestHandler {
  const signatureVerifier = new EnvoySignatureVerifier(options);
  const verify = (req: VerifiedRequest, res: Response, rawBody: Buffer) => {
    req[VERIFIED] = signatureVerifier.verify(req, rawBody);
  };
  const json = bodyParser.json({ verify });
  let accessToken: string | null = null;
  let threshold = 0;

  return (req: Request, res: Response, next: NextFunction) => {
    json(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      try {
        const now = Date.now();
        if (now > threshold) {
          const { access_token: rawAccessToken, expires_in: expiresIn } = await EnvoyPluginAPI.loginAsPlugin();
          accessToken = rawAccessToken;
          threshold = now + (expiresIn * 1000) - (1000 * 60 * 10);
        }
        const envoyRequest = req as EnvoyRequest;
        const envoyResponse = res as EnvoyResponse;
        envoyRequest.envoy = new EnvoyPluginSDK(envoyRequest.body, envoyRequest[VERIFIED], accessToken);

        /**
         * Respond with "ongoing" for long jobs.
         */
        envoyResponse.sendOngoing = (message = '', debugInfo: unknown = {}) => {
          envoyResponse.statusCode = HttpStatus.ONGOING;
          envoyResponse.setHeader('Content-Type', 'application/json');
          envoyResponse.end(JSON.stringify({ message, debugInfo }));
        };

        /**
         * Respond with "ignored" if no action will be performed.
         */
        envoyResponse.sendIgnored = (message = '', debugInfo: unknown = {}, ...attachments: Array<EnvoyPluginJobAttachment>) => {
          envoyResponse.statusCode = HttpStatus.IGNORED;
          envoyResponse.setHeader('Content-Type', 'application/json');
          envoyResponse.end(JSON.stringify({ message, debugInfo, attachments }));
        };

        /**
         * Respond with "failed" in case of errors.
         */
        envoyResponse.sendFailed = (message = '', debugInfo: unknown = {}, ...attachments: Array<EnvoyPluginJobAttachment>) => {
          envoyResponse.statusCode = HttpStatus.FAILED;
          envoyResponse.setHeader('Content-Type', 'application/json');
          envoyResponse.end(JSON.stringify({ message, debugInfo, attachments }));
        };
        next();
      } catch (error) {
        next(error);
      }
    });
  };
}

/**
 * Catches errors and sets the proper status code.
 *
 * @category Middleware
 */
export function errorMiddleware(onError: (err: Error) => void = () => {}): ErrorRequestHandler {
  return (err: Error, req: Request, res: Response, next: NextFunction): void => {
    onError(err);
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}
