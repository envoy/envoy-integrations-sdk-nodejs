import { Request } from 'express';

/**
 * Minimum contract the SDK requires from a logger attached to a request.
 *
 * Two methods:
 * - `error(...)` — used by `structuredErrorMiddleware` to emit unhandled
 *   errors as structured log events.
 * - `child(context)` — used by `addRequestLoggerContext` so middleware
 *   downstream from `envoyMiddleware` can enrich the request logger with
 *   additional context (integration name, install id, route name, …)
 *   without each middleware re-implementing the "if logger, child;
 *   else construct" dance.
 *
 * The `StructuredLogger` from `@envoy/envoy-integrations-internal-sdk`
 * already implements both methods, as do most production logging libraries
 * (pino, bunyan, winston). Callers are free to attach a logger with extra
 * methods (`info`, `warn`, `debug`, …); the SDK just won't call them.
 *
 * @category Logger
 */
export interface StructuredLogger {
  error(message: string, error: Error, metadata?: Record<string, unknown>): void;
  child(context: Record<string, unknown>): StructuredLogger;
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
 * Verifies *both* `error` and `child` are functions — anything attached as
 * `req.logger` must satisfy the full {@link StructuredLogger} contract for
 * the SDK helpers to operate on it.
 *
 * @category Logger
 */
export function isRequestWithLogger(req: Request): req is RequestWithLogger {
  const candidate = (req as { logger?: unknown }).logger;
  if (typeof candidate !== 'object' || candidate === null) {
    return false;
  }
  const logger = candidate as { error?: unknown; child?: unknown };
  return typeof logger.error === 'function' && typeof logger.child === 'function';
}

/**
 * Adds context to `req.logger` using the pattern recommended for every
 * middleware downstream from `envoyMiddleware`:
 *
 *   - **If `req.logger` is already set**, replace it with
 *     `req.logger.child(additionalContext)` so subsequent middleware /
 *     handlers see a logger pre-tagged with the accumulated context.
 *   - **Otherwise**, if a `fallback` factory is provided, call it to
 *     construct a logger from scratch. Use this in middleware that wants
 *     to be usable both with and without `envoyMiddleware`'s loggerFactory
 *     wired up.
 *   - **Otherwise**, leave `req.logger` undefined — the caller opted out
 *     of structured logging.
 *
 * Exceptions thrown by either `req.logger.child(...)` or the fallback
 * factory are caught and surfaced via `console.error` so a buggy logger
 * never breaks the request pipeline. The previous `req.logger` is
 * preserved in that case.
 *
 * @category Logger
 */
export function addRequestLoggerContext(
  req: Request,
  additionalContext: Record<string, unknown>,
  fallback?: (req: Request, context: Record<string, unknown>) => StructuredLogger,
): void {
  const reqWithLogger = req as Request & { logger?: StructuredLogger };
  if (isRequestWithLogger(req)) {
    try {
      reqWithLogger.logger = req.logger.child(additionalContext);
    } catch (childErr) {
      // eslint-disable-next-line no-console
      console.error('addRequestLoggerContext: req.logger.child threw', childErr);
    }
    return;
  }
  if (fallback) {
    try {
      reqWithLogger.logger = fallback(req, additionalContext);
    } catch (fallbackErr) {
      // eslint-disable-next-line no-console
      console.error('addRequestLoggerContext: fallback factory threw', fallbackErr);
    }
  }
}
