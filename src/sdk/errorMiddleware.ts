import { NextFunction } from 'express';
import HttpStatus from '../internal/HttpStatus';
import EnvoyRequest from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

/**
 * Catches errors and sets the proper status code.
 *
 * @category SDK
 */
export default function errorMiddleware(onError: (err: Error) => void = () => {}) {
  return (err: Error, req: EnvoyRequest, res: EnvoyResponse, next: NextFunction): void => {
    onError(err);
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}
