import { Request } from 'express';

/**
 * Minimum contract the SDK requires from a logger attached to a request.
 *
 * Any logger that implements this `error` signature — including the
 * `StructuredLogger` from `@envoy/envoy-integrations-internal-sdk` — is
 * compatible with the SDK middleware (`envoyMiddleware`, `structuredErrorMiddleware`).
 *
 * Kept intentionally narrow: callers are free to attach a logger with
 * additional methods (`info`, `warn`, `debug`, etc.), but the SDK only
 * relies on `error` so it stays decoupled from any specific logging library.
 *
 * @category Logger
 */
export interface StructuredLogger {
  error(message: string, error: Error, metadata?: Record<string, unknown>): void;
}

/**
 * An express `Request` that has been augmented with a `StructuredLogger` at
 * `req.logger` — usually by `envoyMiddleware` (when a `loggerFactory` option
 * is provided) or by a downstream middleware that wants to attach a
 * context-enriched child logger.
 *
 * @category Logger
 */
export interface RequestWithLogger extends Request {
  logger: StructuredLogger;
}

/**
 * Type guard that narrows a request to {@link RequestWithLogger} when a
 * usable structured logger is present at `req.logger`.
 *
 * Use this instead of an unchecked cast when consuming `req.logger` from
 * middleware/handlers — the runtime check ensures that downstream code only
 * runs against a logger object that actually implements `error()`.
 *
 * @category Logger
 */
export function isRequestWithLogger(req: Request): req is RequestWithLogger {
  const candidate = (req as { logger?: unknown }).logger;
  if (typeof candidate !== 'object' || candidate === null) {
    return false;
  }
  return typeof (candidate as { error?: unknown }).error === 'function';
}
