import { Request } from 'express';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyMeta, { EnvoyEventMeta, EnvoyRouteMeta } from './EnvoyMeta';
import EntryPayload from './payloads/EntryPayload';
import InvitePayload from './payloads/InvitePayload';

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
 * For routes, use `EnvoyRouteRequest`,
 * and for events, use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.
 *
 * @category Request
 */
export interface EnvoyBaseRequest<Meta extends EnvoyMeta = EnvoyMeta, Payload = unknown> extends VerifiedRequest {
  envoy: EnvoyPluginSDK<Meta, Payload>
}

/**
 * Use to type your `req` object in route handlers,
 * such as validation URLS or options URLs.
 *
 * @category Request
 */
export type EnvoyRouteRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyRouteMeta, Payload>;

/**
 * Base type for event requests.
 * You should use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.
 *
 * @category Request
 */
export type EnvoyEventRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyEventMeta, Payload>;

/**
 * Use to type your `req` object in entry event handlers,
 * such as handlers for `entry_sign_in`.
 *
 * @category Request
 */
export type EnvoyEntryEventRequest = EnvoyEventRequest<EntryPayload>;

/**
 * Use to type your `req` object in invite event handlers,
 * such as handlers for `invite_created` or `upcoming_visit`.
 *
 * @category Request
 */
export type EnvoyInviteEventRequest = EnvoyEventRequest<InvitePayload>;

/**
 * You probably won't need to use this type directly.
 * For routes, use `EnvoyRouteRequest`,
 * and for events, use `EnvoyEntryEventRequest` or `EnvoyInviteEventRequest`.
 *
 * @category Request
 */
type EnvoyRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyRouteMeta | EnvoyEventMeta, Payload>;
export default EnvoyRequest;
