import { Response } from 'express';
import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';

/**
 * Use to type your `res` object in Envoy request handlers.
 * @category Response
 */
export default interface EnvoyResponse extends Response {
  send: (debugInfo?: unknown) => this;
  /**
   * Marks the job as "ongoing". This is useful for long-running event handling.
   * Later on, you should update the job using
   * {@link EnvoyPluginJob.complete}, {@link EnvoyPluginJob.fail}, or {@link EnvoyPluginJob.ignore}.
   */
  sendOngoing: (debugInfo?: unknown) => void;
  /**
   * Marks the job as "ignored". Useful when you explicitly do not want to handle the event.
   */
  sendIgnored: (message: string, debugInfo?: unknown, ...attachments: Array<EnvoyPluginJobAttachment>) => void;

  /**
   * Marks the job as "failed". The message will be communicated to the Envoy Dashboard user.
   */
  sendFailed: (message: string, debugInfo?: unknown, ...attachments: Array<EnvoyPluginJobAttachment>) => void;
}
