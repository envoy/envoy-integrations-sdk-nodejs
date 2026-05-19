import type { NextFunction, Request, Response } from 'express';

import { envoyMiddleware, structuredErrorMiddleware } from '../../src/sdk/middleware';

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
    it('honors a logger attached by envoyMiddleware loggerFactory option', () => {
      const loggerError = jest.fn();
      // Build the envoy middleware with a loggerFactory; we only care that
      // req.logger is set synchronously, so we don't drive a full request.
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory: () => ({ error: loggerError }),
      });

      const req = buildReq();
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;

      // envoyMiddleware synchronously invokes loggerFactory and attaches req.logger
      // before delegating to body-parser. We don't care about what body-parser does
      // here — we just verify req.logger is now usable by structuredErrorMiddleware.
      middleware(req, res as unknown as Response, next);

      const err = new Error('boom');
      structuredErrorMiddleware()(err, req, res as unknown as Response, next);

      expect(loggerError).toHaveBeenCalledWith('Unhandled error in request pipeline', err, {
        operation: 'structuredErrorMiddleware',
        httpMethod: 'POST',
        httpUrl: '/some/path',
      });
    });

    it('passes integrationName from req.query.name to the loggerFactory', () => {
      const loggerFactory = jest.fn(() => ({ error: jest.fn() }));
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory,
      });

      const req = buildReq({ query: { name: 'checkr' } } as Partial<Request>);
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;

      middleware(req, res as unknown as Response, next);

      expect(loggerFactory).toHaveBeenCalledTimes(1);
      expect(loggerFactory).toHaveBeenCalledWith(req, { integrationName: 'checkr' });
    });

    it('passes integrationName: undefined when ?name= is missing or not a string', () => {
      const loggerFactory = jest.fn(() => ({ error: jest.fn() }));
      const middleware = envoyMiddleware({
        secret: 'test-secret',
        algorithm: 'sha256',
        encoding: 'base64',
        header: 'x-envoy-signature',
        loggerFactory,
      });

      const next = jest.fn() as unknown as NextFunction;

      // No query at all.
      const reqA = buildReq();
      middleware(reqA, buildRes() as unknown as Response, next);
      expect(loggerFactory).toHaveBeenLastCalledWith(reqA, { integrationName: undefined });

      // Repeated query param (express parses to string[]) — not a single string,
      // so we deliberately drop it rather than guess.
      const reqB = buildReq({ query: { name: ['a', 'b'] } } as unknown as Partial<Request>);
      middleware(reqB, buildRes() as unknown as Response, next);
      expect(loggerFactory).toHaveBeenLastCalledWith(reqB, { integrationName: undefined });
    });

    it('continues without a logger when loggerFactory throws', () => {
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
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;

      middleware(req, res as unknown as Response, next);

      // Surfaced via console.error, never thrown.
      expect(consoleErrorSpy).toHaveBeenCalledWith('envoyMiddleware: loggerFactory threw', expect.any(Error));
      // And req.logger should not be set, so the fallback path kicks in downstream.
      const err = new Error('boom');
      consoleErrorSpy.mockClear();
      structuredErrorMiddleware()(err, req, res as unknown as Response, next);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
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
