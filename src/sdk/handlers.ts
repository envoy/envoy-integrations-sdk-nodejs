import {
  NextFunction,
  RequestHandler,
  Request,
  Response,
} from 'express';
import {
  EnvoyEntryEventRequest,
  EnvoyEventRequest,
  EnvoyInviteEventRequest,
  EnvoyLocationEventRequest,
  EnvoyMigrationRouteRequest,
  EnvoyNotificationEventRequest,
  EnvoyOptionsRouteRequest,
  EnvoyRemoteValueRouteRequest,
  EnvoySelectedValuesRouteRequest,
  EnvoyTakeoverEventRequest,
  EnvoyValidationRouteRequest,
} from './EnvoyRequest';
import EnvoyResponse, {
  EnvoyOptionsRouteResponse,
  EnvoyRemoteValueRouteResponse,
  EnvoySelectedValuesRouteResponse,
  EnvoyValidationRouteResponse,
} from './EnvoyResponse';

type SomeObject = Record<string, unknown>;

type Result = Promise<void> | void;

/**
 * Handle an entry event, such as `entry_sign_in`.
 * @category Handler
 */
export type EntryEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyEntryEventRequest<Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle an invite event, such as `invite_created`.
 * @category Handler
 */
export type InviteEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyInviteEventRequest<Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle an location event, such as `location_capacity_updated`.
 * @category Handler
 */
export type LocationEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyLocationEventRequest<Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle an notification event.
 * @category Handler
 */
export type NotificationEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyNotificationEventRequest<Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle a takeover event.
 * @category Handler
 */
export type TakeoverEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyTakeoverEventRequest<Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle a `plugin_uninstalled` event for cleaning up.
 * @category Handler
 */
export type PluginUninstalledEventHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyEventRequest<'plugin_uninstalled', never, Config> & Additions, res: EnvoyResponse) => Result;

/**
 * Handle a "migration" route.
 * @category Handler
 */
export type MigrationRouteHandler<OldConfig = SomeObject, NewConfig = SomeObject, Additions = SomeObject> =
  (req: EnvoyMigrationRouteRequest<OldConfig> & Additions, res: EnvoyResponse<NewConfig>) => Result;

/**
 * Handle an "options" route.
 * @category Handler
 */
export type OptionsRouteHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyOptionsRouteRequest<Config> & Additions, res: EnvoyOptionsRouteResponse) => Result;

/**
 * Handle a "remote value" route.
 * @category Handler
 */
export type RemoteValueRouteHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoyRemoteValueRouteRequest<Config> & Additions, res: EnvoyRemoteValueRouteResponse) => Result;

/**
 * Handle a "selected values" route.
 * @category Handler
 */
export type SelectedValuesRouteHandler<Config = SomeObject, Additions = SomeObject> =
  (req: EnvoySelectedValuesRouteRequest<Config> & Additions, res: EnvoySelectedValuesRouteResponse) => Result;

/**
 * Handle a "validation" route.
 * @category Handler
 */
export type ValidationRouteHandler<Config = SomeObject, Payload = SomeObject, Additions = SomeObject> =
  (req: EnvoyValidationRouteRequest<Payload, Config> & Additions, res: EnvoyValidationRouteResponse<Config>) => Result;

/**
 * Wraps any express.js-based handlers
 * to catch Promise-based errors.
 *
 * @category Handler
 */
// eslint-disable-next-line max-len
export function asyncHandler<Req extends Request, Res extends Response>(handler: (req: Req, res: Res) => Result): RequestHandler {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (req: Req, res: Res, next: NextFunction): void => {
    void Promise.resolve().then(() => handler(req, res)).catch(next);
  };
}

/**
 * Handler for entry events.
 *
 * @category Handler
 */
export function entryEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: EntryEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for invite events.
 *
 * @category Handler
 */
export function inviteEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: InviteEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for location events.
 *
 * @category Handler
 */
export function locationEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: LocationEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for a migration route.
 *
 * @category Handler
 */
export function migrationRouteHandler<
  OldConfig,
  NewConfig,
  Additions = SomeObject,
  >(handler: MigrationRouteHandler<OldConfig, NewConfig, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for notification events.
 *
 * @category Handler
 */
export function notificationEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: NotificationEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for takeover events.
 *
 * @category Handler
 */
export function takeoverEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: TakeoverEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for options URL routes.
 *
 * @category Handler
 */
export function optionsRouteHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: OptionsRouteHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for `plugin_uninstalled` events.
 *
 * @category Handler
 */
export function pluginUninstalledEventHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: PluginUninstalledEventHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for remote value URL routes.
 *
 * @category Handler
 */
export function remoteValueRouteHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: RemoteValueRouteHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for selected values URL routes.
 *
 * @category Handler
 */
export function selectedValuesRouteHandler<
  Config = SomeObject,
  Additions = SomeObject,
  >(handler: SelectedValuesRouteHandler<Config, Additions>) {
  return asyncHandler(handler);
}

/**
 * Handler for validation URL routes.
 *
 * @category Handler
 */
export function validationRouteHandler<
  Config = SomeObject,
  Payload = SomeObject,
  Additions = SomeObject,
  >(handler: ValidationRouteHandler<Config, Payload, Additions>) {
  return asyncHandler(handler);
}
