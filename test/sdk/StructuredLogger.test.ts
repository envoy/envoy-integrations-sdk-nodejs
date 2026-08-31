import type { Request } from 'express';

import { addRequestLoggerContext, isRequestWithLogger, StructuredLogger } from '../../src/sdk/StructuredLogger';

function reqWith(logger: unknown): Request {
  return { logger } as unknown as Request;
}

function makeLogger(): StructuredLogger {
  // Implements the full contract: `error` and `child`. `child` returns
  // a fresh logger that also implements the contract, so chained calls
  // are well-typed.
  return {
    error: jest.fn(),
    child: jest.fn(() => makeLogger()),
  };
}

describe('isRequestWithLogger', () => {
  it('narrows when req.logger has callable error AND child methods', () => {
    const req = reqWith(makeLogger());

    expect(isRequestWithLogger(req)).toBe(true);

    if (isRequestWithLogger(req)) {
      // Type guard narrows `req` to RequestWithLogger so this access is well-typed.
      expect(typeof req.logger.error).toBe('function');
      expect(typeof req.logger.child).toBe('function');
    }
  });

  it('returns false when req.logger is missing', () => {
    expect(isRequestWithLogger({} as Request)).toBe(false);
  });

  it('returns false when req.logger is null', () => {
    expect(isRequestWithLogger(reqWith(null))).toBe(false);
  });

  it('returns false when req.logger is a non-object', () => {
    expect(isRequestWithLogger(reqWith('string-logger'))).toBe(false);
    expect(isRequestWithLogger(reqWith(42))).toBe(false);
  });

  it('returns false when req.logger.error is not a function', () => {
    expect(isRequestWithLogger(reqWith({ error: 'not a fn', child: jest.fn() }))).toBe(false);
    expect(isRequestWithLogger(reqWith({ info: jest.fn(), child: jest.fn() }))).toBe(false);
  });

  it('returns false when req.logger.child is not a function', () => {
    // Loggers must support .child() so downstream middleware can layer in
    // context — a logger without .child can't participate in the contract.
    expect(isRequestWithLogger(reqWith({ error: jest.fn() }))).toBe(false);
    expect(isRequestWithLogger(reqWith({ error: jest.fn(), child: 'not a fn' }))).toBe(false);
  });
});

describe('addRequestLoggerContext', () => {
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

  it('replaces req.logger with the child logger when one is already present', () => {
    const childLogger = makeLogger();
    const baseLogger = { error: jest.fn(), child: jest.fn(() => childLogger) };
    const req = reqWith(baseLogger);

    addRequestLoggerContext(req, { installId: 'i-1' });

    expect(baseLogger.child).toHaveBeenCalledWith({ installId: 'i-1' });
    expect((req as Request & { logger?: unknown }).logger).toBe(childLogger);
  });

  it('uses the fallback factory when req.logger is absent', () => {
    const constructed = makeLogger();
    const fallback = jest.fn(() => constructed);
    const req = {} as Request;

    addRequestLoggerContext(req, { integrationName: 'checkr' }, fallback);

    expect(fallback).toHaveBeenCalledWith(req, { integrationName: 'checkr' });
    expect((req as Request & { logger?: unknown }).logger).toBe(constructed);
  });

  it('is a no-op when req.logger is absent and no fallback is provided', () => {
    const req = {} as Request;

    addRequestLoggerContext(req, { installId: 'i-1' });

    expect((req as Request & { logger?: unknown }).logger).toBeUndefined();
  });

  it('catches exceptions thrown by req.logger.child and keeps the previous logger', () => {
    const baseLogger = {
      error: jest.fn(),
      child: jest.fn(() => {
        throw new Error('child blew up');
      }),
    };
    const req = reqWith(baseLogger);

    addRequestLoggerContext(req, { installId: 'i-1' });

    expect(consoleErrorSpy).toHaveBeenCalledWith('addRequestLoggerContext: req.logger.child threw', expect.any(Error));
    // Previous logger preserved — never downgrades.
    expect((req as Request & { logger?: unknown }).logger).toBe(baseLogger);
  });

  it('catches exceptions thrown by the fallback factory', () => {
    const fallback = jest.fn(() => {
      throw new Error('fallback blew up');
    });
    const req = {} as Request;

    addRequestLoggerContext(req, { installId: 'i-1' }, fallback);

    expect(consoleErrorSpy).toHaveBeenCalledWith('addRequestLoggerContext: fallback factory threw', expect.any(Error));
    expect((req as Request & { logger?: unknown }).logger).toBeUndefined();
  });
});
