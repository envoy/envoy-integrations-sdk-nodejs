import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import EnvoyRequest, { EnvoyEntryEventRequest } from './EnvoyRequest';
import EnvoyResponse from './EnvoyResponse';

/**
 * Will only proceed if the install's `config` has a truthy value for the given `key`.
 *
 * @internal
 */
export function booleanFilterMiddleware<Config>(key: keyof Config, message: string): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    if ((req as EnvoyRequest<unknown, Config>).envoy.meta.config[key]) {
      return next();
    }
    (res as EnvoyResponse).sendIgnored(message);
  };
}

/**
 * Will only proceed if the install's `config` has a truthy value for the given `employeeSignInEnabledKey`.
 *
 * @category Filter
 * @category Middleware
 */
export function employeeSignInEnabledFilterMiddleware<Config>(
  employeeSignInEnabledKey: keyof Config,
  message = 'Envoy Protect is disabled.',
): RequestHandler {
  return booleanFilterMiddleware<Config>(employeeSignInEnabledKey, message);
}

/**
 * Will not proceed if the employee who's signing in is present in the excluded employees list.
 *
 * @category Filter
 * @category Middleware
 */
export function excludedEmployeesFilterMiddleware<Config>(
  excludeEmployeesKey: keyof Config,
  message = 'Employee excluded from integration.',
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const {
      envoy: {
        meta: {
          config,
        },
        payload,
      },
    } = req as EnvoyEntryEventRequest<Config>;
    if (!payload.attributes['employee-screening-flow']) {
      return next();
    }
    const excludedEmployees = config[excludeEmployeesKey] as unknown as Array<string> || [];
    if (!Array.isArray(excludedEmployees)) {
      return next(new Error(`${excludeEmployeesKey} is not an array.`));
    }
    const employeeId = payload.relationships.employee?.data.id;
    if (!employeeId || !excludedEmployees.includes(employeeId)) {
      return next();
    }
    (res as EnvoyResponse).sendIgnored(message);
  };
}

/**
 * Will only proceed if the entry has an invite
 * and the install's `config` has a truthy value for the given `invitesOnlyKey`.
 *
 * @category Filter
 * @category Middleware
 */
export function inviteOnlyEntryFilterMiddleware<Config>(
  invitesOnlyKey: keyof Config,
  message = 'Visitors must be invited.',
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const {
      envoy: {
        meta: {
          config,
        },
        payload,
      },
    } = (req as EnvoyEntryEventRequest<Config>);
    if (!payload.relationships.invite && config[invitesOnlyKey]) {
      return (res as EnvoyResponse).sendIgnored(message);
    }
    next();
  };
}
