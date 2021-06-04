import { NextFunction } from 'express';
import HttpStatus from './HttpStatus';
import EnvoyBaseRequest from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

/**
 * Catches errors and sets the proper status code.
 */
export default function errorMiddleware(onError: (err: Error) => void = () => {}) {
  return (err: Error, req: EnvoyBaseRequest, res: EnvoyResponse, next: NextFunction): void => {
    onError(err);
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}
