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
 * standard Envoy fields.
 *
 * Mirrors the `EnvoyLoggingContext` that
 * `@envoy/envoy-integrations-internal-sdk` builds via `extractLoggingContext`,
 * so a service can swap its bespoke `pluginMiddleware` logger setup for the
 * SDK's built-in one without losing any Datadog facets it already indexes
 * on (`companyId`, `installId`, `event`, etc.). Every field is optional —
 * route requests don't carry `event`/`category`, validation requests have no
 * `recordId`/`recordType`, and the `?name=` convention only applies to
 * monolith services.
 *
 * @category Middleware
 */
export interface EnvoyLoggerContext {
  /**
   * Integration name parsed from the `?name=` query param.
   *
   * NOTE: this is a convention used by Envoy monolith integration services
   * (e.g. `screener-integration-service`, `pacs-integration-service`,
   * `access-control-integration-service`) that fan out to plugin-specific
   * routes via a single `?name=<plugin>` dispatcher. Standalone
   * single-purpose plugins that don't use the `?name=` query param will
   * receive `undefined` here.
   */
  integrationName?: string;
  /** `req.envoy.meta.company.id` — the Envoy company that originated the request. */
  companyId?: string;
  /** `req.envoy.meta.location.id` — the Envoy location the request is scoped to. */
  locationId?: string;
  /** `req.envoy.meta.install_id` — the specific plugin installation that fired the request. */
  installId?: string;
  /** `req.envoy.payload.id` — the visitor/invite/entry record id (event requests only). */
  recordId?: string;
  /** `req.envoy.payload.type` — the JSON:API type of the payload (event requests only). */
  recordType?: string;
  /**
   * `req.envoy.meta.event` — the Envoy event name (e.g. `entry_sign_in`,
   * `invite_created`). Only present on event requests; route requests
   * (validation URLs, options URLs, etc.) will have this `undefined`.
   */
  event?: string;
  /**
   * Coarse-grained grouping of `event` (e.g. `Visitor`, `Workplace`,
   * `Desks`, `Communication`). Mirrors the category mapping used by
   * `extractLoggingContext` in the internal SDK so cross-service Datadog
   * dashboards keep working.
   */
  category?: string;
}

/**
 * Mirrors the category mapping in
 * `@envoy/envoy-integrations-internal-sdk`'s `extractLoggingContext`. Kept
 * here so the SDK can populate `EnvoyLoggerContext.category` without taking
 * a dependency on the internal SDK (which itself depends on this SDK).
 */
const ENVOY_EVENT_CATEGORIES: Readonly<Record<string, string>> = {
  entry_sign_in: 'Visitor',
  entry_sign_out: 'Visitor',
  entry_screen_requested: 'Visitor',
  entry_screened: 'Visitor',
  entry_reviewed: 'Visitor',
  entry_manually_updated: 'Visitor',
  invite_created: 'Visitor',
  invite_updated: 'Visitor',
  invite_removed: 'Visitor',
  invite_reviewed: 'Visitor',
  upcoming_visit: 'Visitor',
  invite_screen_requested: 'Visitor',
  identity_verification_requested: 'Visitor',
  entry_badge_print_requested: 'Visitor',
  employee_entry_sign_in: 'Workplace',
  employee_entry_sign_out: 'Workplace',
  employee_invite_created: 'Workplace',
  employee_invite_updated: 'Workplace',
  employee_upcoming_visit: 'Workplace',
  desk_sign_in: 'Desks',
  takeover_started: 'Communication',
  takeover_ended: 'Communication',
};

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
   * If provided, invoked **twice** per request to build a
   * {@link StructuredLogger} that gets attached to `req.logger` for the rest
   * of the chain (including `structuredErrorMiddleware`).
   *
   * 1. **Early call** — synchronously at the top of the handler, *before*
   *    body parsing and `EnvoyPluginAPI.loginAsPlugin`. The context only
   *    contains `integrationName` (the one field we can derive from the raw
   *    request without parsing the body). This guarantees `req.logger`
   *    exists if body parsing or plugin login fails, so those errors land
   *    as structured logs instead of stringified `console.log` output.
   *
   * 2. **Enrichment call** — after `req.envoy` is initialized, with the
   *    full {@link EnvoyLoggerContext} (`companyId`, `installId`, `event`,
   *    `category`, …). The result *replaces* `req.logger`, so every
   *    downstream handler logs with the standard Envoy facets baked in.
   *    If the enrichment call throws, the early logger is kept as a
   *    fallback — `req.logger` never downgrades to `undefined`.
   *
   * Most factories are a one-liner like
   * `(_req, ctx) => rootLogger.child(ctx)`. The double invocation is
   * cheap (two child-logger allocations) and produces no observable
   * difference at the caller — the second logger supersedes the first.
   *
   * The only error class still served by the fallback `console.error` path
   * in `structuredErrorMiddleware` is malformed-JSON body-parser errors,
   * which have no payload/meta to enrich with regardless.
   *
   * Exceptions thrown by the factory itself are caught and surfaced via
   * `console.error` — a buggy factory never breaks the request pipeline.
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
 * Builds the full {@link EnvoyLoggerContext} from an Envoy request. Defensive
 * against missing fields — every property is optional, so a malformed or
 * partial request degrades to a logger with whatever context was available
 * rather than throwing.
 *
 * Exported so that downstream middleware (e.g. a service's own
 * `pluginMiddleware`) can rebuild the same context when replacing
 * `req.logger` with a richer child logger.
 *
 * @category Middleware
 */
export function extractLoggerContext(req: EnvoyRequest): EnvoyLoggerContext {
  const context: EnvoyLoggerContext = {
    integrationName: extractIntegrationName(req),
  };
  const envoy = req.envoy as EnvoyPluginSDK | undefined;
  if (!envoy) {
    return context;
  }
  // `meta` and `payload` are typed against generics on EnvoyPluginSDK; we treat them
  // as the structural minimum we need here so this stays useful for every request
  // shape (event, route, validation, etc.). Access is wrapped in try/catch because
  // EnvoyPluginSDK's getters throw on unverified requests — a bad signature should
  // not cascade into lost log context.
  let meta:
    | Partial<{
        install_id: string;
        location: { id?: string };
        company: { id?: string };
        event: string;
      }>
    | undefined;
  let payload: Partial<{ id: string; type: string }> | undefined;
  try {
    meta = envoy.meta as typeof meta;
  } catch {
    // unverified or missing meta — leave undefined
  }
  try {
    payload = envoy.payload as typeof payload;
  } catch {
    // unverified or missing payload — leave undefined
  }

  context.installId = meta?.install_id;
  context.locationId = meta?.location?.id;
  context.companyId = meta?.company?.id;
  context.recordId = payload?.id;
  context.recordType = payload?.type;

  if (meta && 'event' in meta && typeof meta.event === 'string') {
    context.event = meta.event;
    context.category = ENVOY_EVENT_CATEGORIES[meta.event] ?? 'Unrecognized';
  }

  return context;
}

/**
 * Sets up an {@link EnvoyPluginSDK} object in the path `req.envoy`.
 * Modifies the `res` object to include Envoy's helpers, per {@link EnvoyResponse}.
 *
 * Also verifies that the request is coming from Envoy,
 * as well as managing the plugin access token lifecycle.
 *
 * If a `loggerFactory` is supplied, attaches the produced
 * {@link StructuredLogger} to `req.logger` early — first with an
 * `integrationName`-only context so body-parser / plugin-login errors are
 * still structured, then again after `req.envoy` is initialized with the
 * full {@link EnvoyLoggerContext} so downstream handlers and
 * `structuredErrorMiddleware` log with the standard Envoy facets baked in.
 * See `loggerFactory` for the full two-call contract.
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
    // Early pass: attach a minimal logger so body-parser / loginAsPlugin
    // errors are still structured. `integrationName` is the only field we
    // can derive from the raw request before body parsing — the enrichment
    // pass below adds the rest once `req.envoy` is initialized.
    if (loggerFactory) {
      try {
        const earlyContext: EnvoyLoggerContext = { integrationName: extractIntegrationName(req) };
        (req as Request & { logger?: StructuredLogger }).logger = loggerFactory(req, earlyContext);
      } catch (factoryErr) {
        // A failing loggerFactory must not break the request pipeline — surface
        // the error so it's debuggable, then continue without a request logger.
        // eslint-disable-next-line no-console
        console.error('envoyMiddleware: loggerFactory (early) threw', factoryErr);
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

        // Enrichment pass: replace `req.logger` with one that carries the
        // full Envoy context now that `req.envoy` exists. If the factory
        // throws here, keep the early logger as a fallback — never downgrade
        // `req.logger` to `undefined`.
        if (loggerFactory) {
          try {
            envoyRequest.logger = loggerFactory(envoyRequest, extractLoggerContext(envoyRequest));
          } catch (factoryErr) {
            // eslint-disable-next-line no-console
            console.error('envoyMiddleware: loggerFactory (enrichment) threw', factoryErr);
          }
        }

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
