import bodyParser from 'body-parser';
import { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express';

import HttpStatus from '../internal/HttpStatus';
import EnvoySignatureVerifier, { EnvoySignatureVerifierOptions } from '../util/EnvoySignatureVerifier';
import EnvoyRequest, { VERIFIED, VerifiedRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';
import EnvoyPluginJobAttachment, { EnvoyPluginScreenerJobAttachment } from './EnvoyPluginJobAttachment';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyPluginAPI from './EnvoyPluginAPI';
import { StructuredLogger, isRequestWithLogger } from './StructuredLogger';

/**
 * Request-scoped context that `envoyMiddleware` makes available to a
 * `loggerFactory` so the factory can produce a logger pre-tagged with the
 * usual Envoy fields.
 *
 * Only the fields that can be derived from the raw express `Request` (before
 * body parsing) are populated here — richer context (install id, company id,
 * event name, etc.) lives on `req.envoy.meta` and should be added by a
 * downstream middleware once the SDK has finished initializing.
 *
 * @category Middleware
 */
export interface EnvoyLoggerContext {
  /**
   * Integration name parsed from the `?name=` query param.
   *
   * NOTE: this is a convention used by Envoy monolith integration services
   * (e.g. `screener-integration-service`, `access-control-integration-service`)
   * that fan out to plugin-specific routes via a single `?name=<plugin>`
   * dispatcher. Standalone single-purpose plugins that don't use the
   * `?name=` query param will receive `undefined` here.
   */
  integrationName?: string;
}

/**
 * Options for {@link envoyMiddleware}.
 *
 * Combines the signature-verifier options (which configure how Envoy's HMAC
 * header is checked) with an optional `loggerFactory` hook for attaching a
 * request-scoped {@link StructuredLogger}.
 *
 * @category Middleware
 */
export interface EnvoyMiddlewareOptions extends Partial<EnvoySignatureVerifierOptions> {
  /**
   * If provided, invoked at the start of every request to build a
   * {@link StructuredLogger}. The result is attached to `req.logger` so it's
   * available for the rest of the middleware chain (including
   * `structuredErrorMiddleware`).
   *
   * The factory is called *before* the request body is parsed and *before*
   * `req.envoy` is set up, so it can only depend on the raw express
   * `Request` plus the {@link EnvoyLoggerContext} the middleware can derive
   * from it (currently the `?name=` integration name used by Envoy monolith
   * integration services). Downstream middleware can replace `req.logger`
   * with a richer child logger once more context (install id, company id,
   * etc.) is available on `req.envoy.meta`.
   */
  loggerFactory?: (req: Request, context: EnvoyLoggerContext) => StructuredLogger;
}

/**
 * Pulls the integration name from `req.query.name` if (and only if) it is a
 * single string. This matches the dispatch convention used by Envoy monolith
 * integration services — see {@link EnvoyLoggerContext.integrationName}.
 */
function extractIntegrationName(req: Request): string | undefined {
  const candidate = req.query?.name;
  return typeof candidate === 'string' ? candidate : undefined;
}

/**
 * Sets up an {@link EnvoyPluginSDK} object in the path `req.envoy`.
 * Modifies the `res` object to include Envoy's helpers, per {@link EnvoyResponse}.
 *
 * Also verifies that the request is coming from Envoy,
 * as well as managing the plugin access token lifecycle.
 *
 * If a `loggerFactory` is supplied, attaches the produced
 * {@link StructuredLogger} to `req.logger` so it's available throughout the
 * middleware chain — including any error that fires inside this middleware
 * before `req.envoy` finishes initializing.
 *
 * @category Middleware
 */
export function envoyMiddleware(options?: EnvoyMiddlewareOptions): RequestHandler {
  const { loggerFactory, ...verifierOptions } = options ?? {};
  const signatureVerifier = new EnvoySignatureVerifier(verifierOptions as EnvoySignatureVerifierOptions);
  const verify = (req: VerifiedRequest, res: Response, rawBody: Buffer) => {
    req[VERIFIED] = signatureVerifier.verify(req, rawBody);
  };
  const json = bodyParser.json({ verify });
  let accessToken: string | null = null;
  let threshold = 0;

  return (req: Request, res: Response, next: NextFunction) => {
    if (loggerFactory) {
      try {
        const context: EnvoyLoggerContext = {
          integrationName: extractIntegrationName(req),
        };
        (req as Request & { logger?: StructuredLogger }).logger = loggerFactory(req, context);
      } catch (factoryErr) {
        // A failing loggerFactory must not break the request pipeline — surface
        // the error so it's debuggable, then continue without a request logger.
        // eslint-disable-next-line no-console
        console.error('envoyMiddleware: loggerFactory threw', factoryErr);
      }
    }
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
 * Like {@link errorMiddleware} but emits errors as structured log events
 * instead of stringifying via a side-effect callback.
 *
 * Default behavior (when no `onError` callback is supplied):
 *   - If upstream middleware has attached a {@link StructuredLogger} at
 *     `req.logger` (typically via `envoyMiddleware`'s `loggerFactory`
 *     option), calls `req.logger.error(message, err, metadata)`. The
 *     metadata includes `operation`, `httpMethod`, and `httpUrl` so Datadog
 *     (or any structured log store) can index on them.
 *   - Otherwise, falls back to `console.error(err)` so errors are never
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
export function structuredErrorMiddleware(onError?: (err: Error, req: Request) => void): ErrorRequestHandler {
  return (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (onError) {
      try {
        onError(err, req);
      } catch (cbErr) {
        // Don't let a logging callback failure swallow the original error.
        // eslint-disable-next-line no-console
        console.error('structuredErrorMiddleware: onError callback threw', cbErr);
      }
    } else if (isRequestWithLogger(req)) {
      try {
        req.logger.error('Unhandled error in request pipeline', err, {
          operation: 'structuredErrorMiddleware',
          httpMethod: req.method,
          httpUrl: req.originalUrl,
        });
      } catch (logErr) {
        // eslint-disable-next-line no-console
        console.error('structuredErrorMiddleware: req.logger.error threw', logErr);
      }
    } else {
      // No request-scoped logger attached — surface the raw error so it isn't lost.
      // eslint-disable-next-line no-console
      console.error(err);
    }
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}
