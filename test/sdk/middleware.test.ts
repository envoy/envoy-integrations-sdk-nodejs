import type { NextFunction, Request, Response } from 'express';

import { structuredErrorHandler } from '../../src/sdk/middleware';

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

describe('structuredErrorHandler', () => {
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

      structuredErrorHandler()(err, req, res as unknown as Response, next);

      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith('Unhandled error in request pipeline', err, {
        operation: 'structuredErrorHandler',
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

      structuredErrorHandler()(err, req, res as unknown as Response, next);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(err);
    });

    it('falls back to console.error when req.logger has no error method', () => {
      const req = buildReq({ logger: { info: jest.fn() } });
      const res = buildRes();
      const next = jest.fn() as unknown as NextFunction;
      const err = new Error('boom');

      structuredErrorHandler()(err, req, res as unknown as Response, next);

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
        structuredErrorHandler()(err, req, res as unknown as Response, next);
      }).not.toThrow();

      // Original error log was attempted; the logger's throw was caught and surfaced via console.
      expect(loggerError).toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'structuredErrorHandler: req.logger.error threw',
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

      structuredErrorHandler(onError)(err, req, res as unknown as Response, next);

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
        structuredErrorHandler(onError)(err, req, res as unknown as Response, next);
      }).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'structuredErrorHandler: onError callback threw',
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

      structuredErrorHandler()(err, req, res as unknown as Response, next);

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

      structuredErrorHandler()(err, req, res as unknown as Response, next as unknown as NextFunction);

      expect(next).toHaveBeenCalledWith(err);
      expect(res.end).not.toHaveBeenCalled();
    });
  });
});
