import type { NextFunction, Request, Response } from 'express';

import EnvoyPluginAPI from '../../src/sdk/EnvoyPluginAPI';
import EnvoyRequest, { VERIFIED } from '../../src/sdk/EnvoyRequest';
import { envoyMiddleware, extractLoggerContext, structuredErrorMiddleware } from '../../src/sdk/middleware';

type MockResponse = {
  headersSent: boolean;
  statusCode: number;
  setHeader: jest.Mock;
  end: jest.Mock;
};

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
      const loggerError = jest.fn();
      const req = buildReq({ logger: { error: loggerError } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith('Unhandled error in request pipeline', err, {
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
      const req = buildReq({ logger: { info: jest.fn() } });
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
      const loggerError = jest.fn(() => {
        throw new Error('logger blew up');
      });
      const req = buildReq({ logger: { error: loggerError } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      expect(() => {
        structuredErrorMiddleware()(err, req, res as unknown as Response, next);
      }).not.toThrow();

      // Original error log was attempted; the logger's throw was caught and surfaced via console.
      expect(loggerError).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'structuredErrorMiddleware: req.logger.error threw',
        expect.any(Error),
      );
    });
  });

  describe('with onError callback', () => {
    it('invokes the callback with (err, req) and does not touch req.logger', () => {
      const onError = jest.fn();
      const loggerError = jest.fn();
      const req = buildReq({ logger: { error: loggerError } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorMiddleware(onError)(err, req, res as unknown as Response, next);

      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledWith(err, req);
      expect(loggerError).not.toHaveBeenCalled();
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

  describe('end-to-end with envoyMiddleware loggerFactory', () => {
    let loginSpy: jest.SpyInstance;

    beforeEach(() => {
      // envoyMiddleware refreshes its access token via EnvoyPluginAPI.loginAsPlugin
      // before initializing req.envoy. Stub it so tests don't hit the network.
      loginSpy = jest
        .spyOn(EnvoyPluginAPI, 'loginAsPlugin')
        .mockResolvedValue({ access_token: 'test-token', expires_in: 3600 } as never);
    });

    afterEach(() => {
      loginSpy.mockRestore();
    });

    // Short-circuit body-parser by marking the body as pre-parsed — body-parser
    // skips its stream-reading path and calls our callback directly when it sees
    // `req._body === true`, so we can drive envoyMiddleware in a unit test
    // without standing up a real HTTP server. We also mark the request as
    // VERIFIED, since body-parser's `verify` callback (which would normally set
    // it) is bypassed by the short-circuit.
    function buildEventReq(overrides: Partial<Request> = {}): Request {
      return {
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
        ...overrides,
      } as unknown as Request;
    }

    it('attaches a logger built from the full Envoy context after req.envoy is initialized', async () => {
      const logger = { error: jest.fn() };
      const loggerFactory = jest.fn(() => logger);
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory,
      });

      const req = buildEventReq();
      const res = buildRes();
      // Resolves once envoyMiddleware calls next(), which only happens after the
      // async login + EnvoyPluginSDK setup + loggerFactory call.
      await new Promise<void>((resolve, reject) => {
        middleware(
          req,
          res as unknown as Response,
          ((err?: unknown) => (err ? reject(err) : resolve())) as NextFunction,
        );
      });

      expect(loggerFactory).toHaveBeenCalledTimes(1);
      const [factoryReq, factoryCtx] = loggerFactory.mock.calls[0] as unknown as [EnvoyRequest, unknown];
      expect(factoryReq).toBe(req);
      expect(factoryReq.envoy).toBeDefined();
      expect(factoryCtx).toEqual({
        integrationName: 'checkr',
        installId: 'install-1',
        locationId: 'loc-1',
        companyId: 'company-1',
        recordId: 'visitor-1',
        recordType: 'visitors',
        event: 'entry_sign_in',
        category: 'Visitor',
      });
    });

    it('catches loggerFactory exceptions and leaves req.logger unset', async () => {
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory: () => {
          throw new Error('factory blew up');
        },
      });

      const req = buildEventReq();
      const res = buildRes();
      await new Promise<void>((resolve, reject) => {
        middleware(
          req,
          res as unknown as Response,
          ((err?: unknown) => (err ? reject(err) : resolve())) as NextFunction,
        );
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith('envoyMiddleware: loggerFactory threw', expect.any(Error));
      // structuredErrorMiddleware should fall through to console.error since
      // req.logger never got set.
      consoleErrorSpy.mockClear();
      const err = new Error('boom');
      structuredErrorMiddleware()(err, req, res as unknown as Response, jest.fn() as unknown as NextFunction);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
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

      // Every field present in the result is `undefined` — no throw, no missing keys.
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
