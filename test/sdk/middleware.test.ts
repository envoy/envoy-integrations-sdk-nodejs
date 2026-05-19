import type { NextFunction, Request, Response } from 'express';

import EnvoyPluginAPI from '../../src/sdk/EnvoyPluginAPI';
import EnvoyRequest, { VERIFIED } from '../../src/sdk/EnvoyRequest';
import {
  envoyLoggerContextMiddleware,
  envoyMiddleware,
  extractLoggerContext,
  structuredErrorMiddleware,
} from '../../src/sdk/middleware';
import { StructuredLogger } from '../../src/sdk/StructuredLogger';

type MockResponse = {
  headersSent: boolean;
  statusCode: number;
  setHeader: jest.Mock;
  end: jest.Mock;
};

/**
 * A test logger that satisfies the full {@link StructuredLogger} contract:
 * `error` records calls; `child(ctx)` returns a new test logger that records
 * the context it was built with, so multi-step enrichment chains can be
 * inspected.
 */
function buildLogger(): StructuredLogger & { error: jest.Mock; child: jest.Mock } {
  const logger = {
    error: jest.fn(),
    // `child` is set after construction so the recursive type lines up.
    child: jest.fn(),
  };
  logger.child.mockImplementation(() => buildLogger());
  return logger;
}

function buildReq(overrides: Partial<Request & { logger?: unknown }> = {}): Request {
  return {
    method: 'POST',
    originalUrl: '/some/path',
    headers: {},
    ...overrides,
  } as Request;
}

function buildRes(headersSent = false): MockResponse {
  return {
    headersSent,
    statusCode: 0,
    setHeader: jest.fn(),
    end: jest.fn(),
  };
}

describe('structuredErrorMiddleware', () => {
  /* eslint-disable no-console */
  const originalConsoleError = console.error;
  let consoleErrorSpy: jest.Mock;

  beforeEach(() => {
    consoleErrorSpy = jest.fn();
    console.error = consoleErrorSpy;
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });
  /* eslint-enable no-console */

  describe('default behavior (no onError callback)', () => {
    it('calls req.logger.error with message, err, and {operation, httpMethod, httpUrl}', () => {
      const logger = buildLogger();
      const req = buildReq({ logger });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('Unhandled error in request pipeline', err, {
        operation: 'structuredErrorMiddleware',
        httpMethod: 'POST',
        httpUrl: '/some/path',
      });
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('falls back to console.error when req.logger is missing', () => {
      const req = buildReq();
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
    });

    it('falls back to console.error when req.logger has no error method', () => {
      const req = buildReq({ logger: { info: jest.fn(), child: jest.fn() } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
    });

    it('falls back to console.error when req.logger has no child method', () => {
      // .child is required by the StructuredLogger contract — without it the
      // logger can't participate in the addRequestLoggerContext pattern.
      const req = buildReq({ logger: { error: jest.fn() } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
    });

    it('falls back to console.error when req.logger is null', () => {
      const req = buildReq({ logger: null });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
    });

    it('does not propagate exceptions thrown by req.logger.error', () => {
      const logger = buildLogger();
      logger.error.mockImplementation(() => {
        throw new Error('logger blew up');
      });
      const req = buildReq({ logger });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      expect(() => {
        structuredErrorMiddleware()(err, req, res as unknown as Response, next);
      }).not.toThrow();

      expect(logger.error).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'structuredErrorMiddleware: req.logger.error threw',
        expect.any(Error),
      );
    });
  });

  describe('with onError callback', () => {
    it('invokes the callback with (err, req) and does not touch req.logger', () => {
      const onError = jest.fn();
      const logger = buildLogger();
      const req = buildReq({ logger });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware(onError)(err, req, res as unknown as Response, next);

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(err, req);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('does not propagate exceptions thrown by the callback', () => {
      const onError = jest.fn(() => {
        throw new Error('callback blew up');
      });
      const req = buildReq();
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      expect(() => {
        structuredErrorMiddleware(onError)(err, req, res as unknown as Response, next);
      }).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'structuredErrorMiddleware: onError callback threw',
        expect.any(Error),
      );
    });
  });

  describe('response handling', () => {
    it('sends a 500 JSON response when headers have not been sent', () => {
      const req = buildReq();
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(res.statusCode).toBe(500);
      expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
      expect(res.end).toHaveBeenCalledWith(JSON.stringify({ message: 'boom' }));
      expect(next).not.toHaveBeenCalled();
    });

    it('delegates to next(err) when headers have already been sent', () => {
      const req = buildReq();
      const res = buildRes(true);
      const next = jest.fn();
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next as unknown as NextFunction);

      expect(next).toHaveBeenCalledWith(err);
      expect(res.end).not.toHaveBeenCalled();
    });
  });
});

describe('envoyMiddleware loggerFactory', () => {
  /* eslint-disable no-console */
  const originalConsoleError = console.error;
  let consoleErrorSpy: jest.Mock;

  beforeEach(() => {
    consoleErrorSpy = jest.fn();
    console.error = consoleErrorSpy;
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });
  /* eslint-enable no-console */

  it('attaches a logger synchronously with integrationName-only context, before body parsing', () => {
    const logger = buildLogger();
    const loggerFactory = jest.fn(() => logger);
    const middleware = envoyMiddleware({
      secret: 'test-secret',
      algorithm: 'sha256',
      encoding: 'base64',
      header: 'x-envoy-signature',
      loggerFactory,
    });

    const req = buildReq({ query: { name: 'checkr' } });
    middleware(req, buildRes() as unknown as Response, jest.fn() as unknown as NextFunction);

    expect(loggerFactory).toHaveBeenCalledTimes(1);
    expect(loggerFactory).toHaveBeenCalledWith(req, { integrationName: 'checkr' });
    expect((req as Request & { logger?: unknown }).logger).toBe(logger);
  });

  it('leaves req.logger unset (and console.errors) when the factory throws', () => {
    const middleware = envoyMiddleware({
      secret: 'test-secret',
      algorithm: 'sha256',
      encoding: 'base64',
      header: 'x-envoy-signature',
      loggerFactory: () => {
        throw new Error('factory blew up');
      },
    });

    const req = buildReq();
    middleware(req, buildRes() as unknown as Response, jest.fn() as unknown as NextFunction);

    expect(consoleErrorSpy).toHaveBeenCalledWith('envoyMiddleware: loggerFactory threw', expect.any(Error));
    expect((req as Request & { logger?: unknown }).logger).toBeUndefined();
  });

  it('does not call the factory again after req.envoy is initialized', async () => {
    const loginSpy = jest
      .spyOn(EnvoyPluginAPI, 'loginAsPlugin')
      .mockResolvedValue({ access_token: 'test-token', expires_in: 3600 } as never);
    try {
      const logger = buildLogger();
      const loggerFactory = jest.fn(() => logger);
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory,
      });

      // Same body-parser short-circuit / VERIFIED trick as the integration test below.
      const req = {
        method: 'POST',
        originalUrl: '/some/path',
        headers: {},
        query: { name: 'checkr' },
        _body: true,
        [VERIFIED]: true,
        body: {
          meta: {
            install_id: 'install-1',
            location: { id: 'loc-1' },
            company: { id: 'company-1' },
            event: 'entry_sign_in',
          },
          payload: { id: 'visitor-1', type: 'visitors' },
        },
      } as unknown as Request;

      await new Promise<void>((resolve, reject) => {
        middleware(
          req,
          buildRes() as unknown as Response,
          ((err?: unknown) => (err ? reject(err) : resolve())) as NextFunction,
        );
      });

      // Factory should be invoked exactly once — enrichment happens via .child()
      // downstream, not by re-invoking the factory.
      expect(loggerFactory).toHaveBeenCalledTimes(1);
      expect(loggerFactory).toHaveBeenCalledWith(req, { integrationName: 'checkr' });
    } finally {
      loginSpy.mockRestore();
    }
  });
});

describe('envoyLoggerContextMiddleware', () => {
  /* eslint-disable no-console */
  const originalConsoleError = console.error;
  let consoleErrorSpy: jest.Mock;

  beforeEach(() => {
    consoleErrorSpy = jest.fn();
    console.error = consoleErrorSpy;
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });
  /* eslint-enable no-console */

  function buildEnvoyReqWithLogger(logger: StructuredLogger | undefined): Request {
    return {
      method: 'POST',
      originalUrl: '/some/path',
      headers: {},
      query: { name: 'checkr' },
      envoy: {
        meta: {
          install_id: 'install-1',
          location: { id: 'loc-1' },
          company: { id: 'company-1' },
          event: 'entry_sign_in',
        },
        payload: { id: 'visitor-1', type: 'visitors' },
      },
      ...(logger ? { logger } : {}),
    } as unknown as Request;
  }

  it('replaces req.logger with a child carrying the full Envoy context', () => {
    const childLogger = buildLogger();
    const baseLogger = buildLogger();
    baseLogger.child.mockReturnValue(childLogger);

    const req = buildEnvoyReqWithLogger(baseLogger);
    const next = jest.fn() as unknown as NextFunction;

    envoyLoggerContextMiddleware()(req, buildRes() as unknown as Response, next);

    expect(baseLogger.child).toHaveBeenCalledWith({
      integrationName: 'checkr',
      installId: 'install-1',
      locationId: 'loc-1',
      companyId: 'company-1',
      recordId: 'visitor-1',
      recordType: 'visitors',
      event: 'entry_sign_in',
      category: 'Visitor',
    });
    expect((req as Request & { logger?: unknown }).logger).toBe(childLogger);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('uses the fallback factory when req.logger is absent', () => {
    const constructed = buildLogger();
    const fallback = jest.fn(() => constructed);
    const req = buildEnvoyReqWithLogger(undefined);
    const next = jest.fn() as unknown as NextFunction;

    envoyLoggerContextMiddleware({ fallback })(req, buildRes() as unknown as Response, next);

    expect(fallback).toHaveBeenCalledTimes(1);
    const [fallbackReq, fallbackCtx] = fallback.mock.calls[0] as unknown as [Request, unknown];
    expect(fallbackReq).toBe(req);
    expect(fallbackCtx).toEqual({
      integrationName: 'checkr',
      installId: 'install-1',
      locationId: 'loc-1',
      companyId: 'company-1',
      recordId: 'visitor-1',
      recordType: 'visitors',
      event: 'entry_sign_in',
      category: 'Visitor',
    });
    expect((req as Request & { logger?: unknown }).logger).toBe(constructed);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('is a no-op when req.logger is absent and no fallback is provided', () => {
    const req = buildEnvoyReqWithLogger(undefined);
    const next = jest.fn() as unknown as NextFunction;

    envoyLoggerContextMiddleware()(req, buildRes() as unknown as Response, next);

    expect((req as Request & { logger?: unknown }).logger).toBeUndefined();
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('extractLoggerContext', () => {
  function buildEnvoyRequest(envoy: unknown, query: Record<string, unknown> = {}): EnvoyRequest {
    return { envoy, query } as unknown as EnvoyRequest;
  }

  it('pulls every standard Envoy field from an event request', () => {
    const req = buildEnvoyRequest(
      {
        meta: {
          install_id: 'install-1',
          location: { id: 'loc-1' },
          company: { id: 'company-1' },
          event: 'invite_created',
        },
        payload: { id: 'invite-1', type: 'invites' },
      },
      { name: 'checkr' },
    );

    expect(extractLoggerContext(req)).toEqual({
      integrationName: 'checkr',
      installId: 'install-1',
      locationId: 'loc-1',
      companyId: 'company-1',
      recordId: 'invite-1',
      recordType: 'invites',
      event: 'invite_created',
      category: 'Visitor',
    });
  });

  it('omits event/category for route requests (no `event` on meta)', () => {
    const req = buildEnvoyRequest(
      {
        meta: {
          install_id: 'install-1',
          location: { id: 'loc-1' },
          company: { id: 'company-1' },
          route: 'validate',
        },
        payload: {},
      },
      { name: 'checkr' },
    );

    const ctx = extractLoggerContext(req);
    expect(ctx.event).toBeUndefined();
    expect(ctx.category).toBeUndefined();
    expect(ctx.installId).toBe('install-1');
  });

  it('maps unrecognized events to category "Unrecognized"', () => {
    const req = buildEnvoyRequest({
      meta: { install_id: 'i', location: { id: 'l' }, company: { id: 'c' }, event: 'mystery_event' },
      payload: {},
    });

    expect(extractLoggerContext(req)).toMatchObject({
      event: 'mystery_event',
      category: 'Unrecognized',
    });
  });

  it('maps workplace / desks / communication events to their categories', () => {
    const makeReq = (event: string) => buildEnvoyRequest({ meta: { event }, payload: {} });

    expect(extractLoggerContext(makeReq('employee_entry_sign_in')).category).toBe('Workplace');
    expect(extractLoggerContext(makeReq('desk_sign_in')).category).toBe('Desks');
    expect(extractLoggerContext(makeReq('takeover_started')).category).toBe('Communication');
  });

  it('returns just integrationName when req.envoy is missing', () => {
    const req = buildEnvoyRequest(undefined, { name: 'checkr' });

    expect(extractLoggerContext(req)).toEqual({ integrationName: 'checkr' });
  });

  it('degrades gracefully when meta/payload fields are missing', () => {
    const req = buildEnvoyRequest({ meta: {}, payload: undefined }, {});

    expect(extractLoggerContext(req)).toEqual({
      integrationName: undefined,
      installId: undefined,
      locationId: undefined,
      companyId: undefined,
      recordId: undefined,
      recordType: undefined,
    });
  });
});
