import { Request } from 'express';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyMeta, { EnvoyEventMeta, EnvoyRouteMeta } from './EnvoyMeta';
import EntryPayload from './payloads/EntryPayload';
import InvitePayload from './payloads/InvitePayload';

export const VERIFIED = Symbol('verified');

export interface VerifiedRequest extends Request {
  [VERIFIED]: boolean
}

export default interface EnvoyRequest <Meta extends EnvoyMeta = EnvoyMeta, Payload = any> extends VerifiedRequest {
  envoy: EnvoyPluginSDK<Meta, Payload>
}

export type EnvoyRouteRequest<Payload = any> = EnvoyRequest<EnvoyRouteMeta, Payload>;
export type EnvoyEntryEventRequest = EnvoyRequest<EnvoyEventMeta, EntryPayload>;
export type EnvoyInviteEventRequest = EnvoyRequest<EnvoyEventMeta, InvitePayload>;
