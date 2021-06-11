import { RequestHandler, NextFunction } from 'express';
import EnvoyRequest from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

export type EnvoyHandler = (req: EnvoyRequest, res: EnvoyResponse) => void | Promise<void>;

/**
 * Wraps any express.js-based handlers
 * to catch Promise-based errors.
 *
 * @category Helper
 */
export default function asyncHandler(handler: RequestHandler | EnvoyHandler) {
  return async (req: EnvoyRequest, res: EnvoyResponse, next: NextFunction): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
