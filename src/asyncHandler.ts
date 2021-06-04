/**
 * Catches Promise-based errors.
 */
import { RequestHandler, NextFunction } from 'express';
import EnvoyRequest from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

type EnvoyHandler = (req: EnvoyRequest, res: EnvoyResponse) => void | Promise<void>;

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
