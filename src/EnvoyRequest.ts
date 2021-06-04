import { Request } from 'express';
import EnvoyPluginSDK from './EnvoyPluginSDK';
import EnvoyMeta from './EnvoyMeta';

export const VERIFIED = Symbol('verified');

export interface VerifiedRequest extends Request {
  [VERIFIED]: boolean
}

export default interface EnvoyRequest <Meta extends EnvoyMeta = EnvoyMeta, Payload = any> extends VerifiedRequest {
  envoy: EnvoyPluginSDK<Meta, Payload>
}
