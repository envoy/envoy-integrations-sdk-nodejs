import type { Request } from 'express';

import { isRequestWithLogger } from '../../src/sdk/StructuredLogger';

function reqWith(logger: unknown): Request {
  return { logger } as unknown as Request;
}

describe('isRequestWithLogger', () => {
  it('narrows when req.logger has a callable error method', () => {
    const req = reqWith({ error: jest.fn() });

    expect(isRequestWithLogger(req)).toBe(true);

    if (isRequestWithLogger(req)) {
      // Type guard narrows `req` to RequestWithLogger so this access is well-typed.
      expect(typeof req.logger.error).toBe('function');
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
    expect(isRequestWithLogger(reqWith({ error: 'not a fn' }))).toBe(false);
    expect(isRequestWithLogger(reqWith({ info: jest.fn() }))).toBe(false);
  });

  it('accepts loggers with additional methods beyond error', () => {
    const fullLogger = {
      error: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
    };

    expect(isRequestWithLogger(reqWith(fullLogger))).toBe(true);
  });
});
