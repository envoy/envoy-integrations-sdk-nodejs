import { Response } from 'express';
import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';

/**
 * Use to type your `res` object in Envoy request handlers.
 */
export default interface EnvoyResponse extends Response {
  send: (debugInfo?: unknown) => this;
  sendOngoing: (debugInfo?: unknown) => void;
  sendIgnored: (message: string, debugInfo?: unknown, ...attachments: Array<EnvoyPluginJobAttachment>) => void;
  sendFailed: (message: string, debugInfo?: unknown, ...attachments: Array<EnvoyPluginJobAttachment>) => void;
}
