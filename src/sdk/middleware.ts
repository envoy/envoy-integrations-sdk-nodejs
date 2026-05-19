import bodyParser from 'body-parser';
import { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express';

import HttpStatus from '../internal/HttpStatus';
import EnvoySignatureVerifier, { EnvoySignatureVerifierOptions } from '../util/EnvoySignatureVerifier';
import EnvoyRequest, { VERIFIED, VerifiedRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';
import EnvoyPluginJobAttachment, { EnvoyPluginScreenerJobAttachment } from './EnvoyPluginJobAttachment';
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
          threshold = now + expiresIn * 1000 - 1000 * 60 * 10;
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
        envoyResponse.sendIgnored = (
          message = '',
          debugInfo: unknown = {},
          ...attachments: Array<EnvoyPluginJobAttachment>
        ) => {
          envoyResponse.statusCode = HttpStatus.IGNORED;
          envoyResponse.setHeader('Content-Type', 'application/json');
          envoyResponse.end(JSON.stringify({ message, debugInfo, attachments }));
        };

        /**
         * Respond with "failed" in case of errors.
         */
        envoyResponse.sendFailed = (
          message = '',
          debugInfo: unknown = {},
          ...attachments: Array<EnvoyPluginJobAttachment>
        ) => {
          envoyResponse.statusCode = HttpStatus.FAILED;
          envoyResponse.setHeader('Content-Type', 'application/json');
          envoyResponse.end(JSON.stringify({ message, debugInfo, attachments }));
        };

        /**
         * Respond with "failed" for screener in case of screener matches.
         */
        envoyResponse.sendFailedScreen = (
          message = '',
          debugInfo: unknown = {},
          ...attachments: Array<EnvoyPluginScreenerJobAttachment>
        ) => {
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

/**
 * Minimal structured-logger shape that `structuredErrorHandler` looks for at
 * `req.logger`. Any logger exposing this method (e.g. the StructuredLogger
 * from `@envoy/envoy-integrations-internal-sdk`) is compatible.
 */
export interface StructuredErrorLogger {
  error(message: string, error: Error, metadata?: Record<string, unknown>): void;
}

interface RequestWithLogger extends Request {
  logger?: StructuredErrorLogger;
}

/**
 * Like {@link errorMiddleware} but emits errors as structured log events
 * instead of relying on `error.toString()` via a side-effect callback.
 *
 * Default behavior (when no `onError` callback is supplied):
 *   - If upstream middleware has attached a `StructuredErrorLogger` at
 *     `req.logger`, call `req.logger.error(message, err, metadata)`. The
 *     metadata includes `operation`, `httpMethod`, and `httpUrl` so Datadog
 *     (or any structured log store) can index on them.
 *   - Otherwise, fall back to `console.error(err)` so errors are never
 *     silently lost.
 *
 * Pass an `onError` callback to take full control of how the error is logged
 * — the SDK invokes it with both the error and the request, so callers can
 * extract request-scoped context however they like.
 *
 * Named separately from `errorMiddleware` so existing consumers that switch
 * over without first wiring `req.logger` upstream don't silently lose the
 * structured payload — the fallback `console.error` makes that scenario
 * observable instead of silent.
 *
 * @category Middleware
 */
export function structuredErrorHandler(
  onError?: (err: Error, req: Request) => void,
): ErrorRequestHandler {
  return (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (onError) {
      try {
        onError(err, req);
      } catch (cbErr) {
        // Don't let a logging callback failure swallow the original error.
        // eslint-disable-next-line no-console
        console.error('structuredErrorHandler: onError callback threw', cbErr);
      }
    } else {
      const requestLogger = (req as RequestWithLogger).logger;
      if (requestLogger && typeof requestLogger.error === 'function') {
        try {
          requestLogger.error('Unhandled error in request pipeline', err, {
            operation: 'structuredErrorHandler',
            httpMethod: req.method,
            httpUrl: req.originalUrl,
          });
        } catch (logErr) {
          // eslint-disable-next-line no-console
          console.error('structuredErrorHandler: req.logger.error threw', logErr);
        }
      } else {
        // No request-scoped logger attached — surface the raw error so it isn't lost.
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}
