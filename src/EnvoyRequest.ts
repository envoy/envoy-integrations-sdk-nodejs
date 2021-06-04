import { Request } from 'express';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyMeta, { EnvoyEventMeta, EnvoyRouteMeta } from './EnvoyMeta';
import EntryPayload from './payloads/EntryPayload';
import InvitePayload from './payloads/InvitePayload';

export const VERIFIED = Symbol('verified');

export interface VerifiedRequest extends Request {
  [VERIFIED]: boolean
}

export interface EnvoyBaseRequest<Meta extends EnvoyMeta = EnvoyMeta, Payload = unknown> extends VerifiedRequest {
  envoy: EnvoyPluginSDK<Meta, Payload>
}

/**
 * Use to type your `req` object in route handlers,
 * such as validation URLS or options URLs.
 */
export type EnvoyRouteRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyRouteMeta, Payload>;

/**
 * Use to type your `req` object in route handlers,
 * such as validation URLS or options URLs.
 */
export type EnvoyEventRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyEventMeta, Payload>;

/**
 * Use to type your `req` object in entry event handlers,
 * such as handlers for `entry_sign_in`.
 */
export type EnvoyEntryEventRequest = EnvoyEventRequest<EntryPayload>;

/**
 * Use to type your `req` object in invite event handlers,
 * such as handlers for `invite_created` or `upcoming_visit`.
 */
export type EnvoyInviteEventRequest = EnvoyEventRequest<InvitePayload>;

type EnvoyRequest<Payload = unknown> = EnvoyBaseRequest<EnvoyRouteMeta | EnvoyEventMeta, Payload>;
export default EnvoyRequest;
