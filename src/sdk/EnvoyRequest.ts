import { Request } from 'express';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyMeta, { EnvoyEventMeta, EnvoyRouteMeta } from './EnvoyMeta';
import EntryPayload from '../payloads/EntryPayload';
import InvitePayload from '../payloads/InvitePayload';
import LocationPayload from '../payloads/LocationPayload';
import NotificationPayload from '../payloads/NotificationPayload';
import TakeoverPayload from '../payloads/TakeoverPayload';
import EnvoyEntryEvent from '../internal/EnvoyEntryEvent';
import EnvoyInviteEvent from '../internal/EnvoyInviteEvent';
import EnvoyLocationEvent from '../internal/EnvoyLocationEvent';
import EnvoyOptionsRouteResponseBody from '../internal/EnvoyOptionsRouteResponseBody';
import EnvoyOptionsRouteParams from '../internal/EnvoyOptionsRouteParams';
import EnvoySelectedValuesRouteResponseBody from '../internal/EnvoySelectedValuesRouteResponseBody';
import EnvoySelectedValuesRouteParams from '../internal/EnvoySelectedValuesRouteParams';
import EnvoyRemoteValueRouteResponseBody from '../internal/EnvoyRemoteValueRouteResponseBody';

/**
 * @internal
 */
export const VERIFIED = Symbol('verified');

/**
 * @internal
 */
export interface VerifiedRequest extends Request {
  [VERIFIED]: boolean
}

/**
 * Base type for Envoy requests.
 * You probably won't need to use this type directly.
 * For routes, use {@link EnvoyRouteRequest},
 * and for events, use {@link EnvoyEntryEventRequest} or {@link EnvoyInviteEventRequest}.
 *
 * @category Base
 */
export interface EnvoyBaseRequest<Meta = EnvoyMeta, Payload = unknown> extends VerifiedRequest {
  envoy: EnvoyPluginSDK<Meta, Payload>
}

/**
 * Use to type your `req` object in Envoy route handlers such as validation URLs.
 *
 * @category Request
 */
export type EnvoyRouteRequest<
  Payload = unknown,
  Config = Record<string, unknown>,
  Params = Record<string, unknown>,
  > = EnvoyBaseRequest<EnvoyRouteMeta<Config, Params>, Payload>;

/**
 * Use to type your `req` object in Envoy "migration" route handlers.
 *
 * @category Request
 */
export type EnvoyMigrationRouteRequest<OldConfig = Record<string, unknown>> =
  EnvoyRouteRequest<never, OldConfig, never>;

/**
 * Use to type your `req` object in Envoy "options URL" route handlers.
 *
 * @category Request
 */
export type EnvoyOptionsRouteRequest<Config = Record<string, unknown>> =
  EnvoyRouteRequest<EnvoyOptionsRouteResponseBody, Config, EnvoyOptionsRouteParams>;

/**
 * Use to type your `req` object in Envoy "selected values URL" route handlers.
 *
 * @category Request
 */
export type EnvoySelectedValuesRouteRequest<Config = Record<string, unknown>> =
  EnvoyRouteRequest<EnvoySelectedValuesRouteResponseBody, Config, EnvoySelectedValuesRouteParams>;

/**
 * Use to type your `req` object in Envoy "remote value URL" route handlers.
 *
 * @category Request
 */
export type EnvoyRemoteValueRouteRequest<Config = Record<string, unknown>> =
  EnvoyRouteRequest<EnvoyRemoteValueRouteResponseBody, Config, never>;

/**
 * Use to type your `req` object in Envoy "validation URL" route handlers.
 *
 * @category Request
 */
export type EnvoyValidationRouteRequest<Payload = Record<string, unknown>, Config = Record<string, unknown>> =
  EnvoyRouteRequest<Payload, Config, never>;

/**
 * Base type for event requests.
 * You should prefer specific types such as {@link EnvoyEntryEventRequest} or {@link EnvoyInviteEventRequest}.
 *
 * @category Request
 */
export type EnvoyEventRequest<Event extends string = string, Payload = unknown, Config = Record<string, unknown>> =
  EnvoyBaseRequest<EnvoyEventMeta<Event, Config>, Payload>;

/**
 * Use to type your `req` object in entry event handlers,
 * such as handlers for `entry_sign_in`.
 *
 * @category Request
 */
export type EnvoyEntryEventRequest<Config = Record<string, unknown>> =
  EnvoyEventRequest<EnvoyEntryEvent, EntryPayload, Config>;

/**
 * Use to type your `req` object in invite event handlers,
 * such as handlers for `invite_created` or `upcoming_visit`.
 *
 * @category Request
 */
export type EnvoyInviteEventRequest<Config = Record<string, unknown>> =
  EnvoyEventRequest<EnvoyInviteEvent, InvitePayload, Config>;

/**
 * Use to type your `req` object in location event handlers,
 * such as handlers for `location_capacity_updated`.
 *
 * @category Request
 */
export type EnvoyLocationEventRequest<Config = Record<string, unknown>> =
  EnvoyEventRequest<EnvoyLocationEvent, LocationPayload, Config>;

/**
 * Use to type your `req` object in your notification event handler.
 *
 * @category Request
 */
export type EnvoyNotificationEventRequest<Config = Record<string, unknown>> =
  EnvoyEventRequest<string, NotificationPayload, Config>;

/**
 * Use to type your `req` object in your takeover event handler.
 *
 * @category Request
 */
export type EnvoyTakeoverEventRequest<Config = Record<string, unknown>> =
  EnvoyEventRequest<string, TakeoverPayload, Config>;

/**
 * You probably won't need to use this type directly.
 * For routes, use {@link EnvoyRouteRequest},
 * and for events, use {@link EnvoyEntryEventRequest} or {@link EnvoyInviteEventRequest}.
 *
 * @category Base
 */
type EnvoyRequest<Payload = unknown, Config = Record<string, unknown>> =
  EnvoyBaseRequest<EnvoyRouteMeta<Config> | EnvoyEventMeta<string, Config>, Payload>;
export default EnvoyRequest;
