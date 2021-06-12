import { Response } from 'express';
import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';
import EnvoyOptionsRouteResponseBody from '../internal/EnvoyOptionsRouteResponseBody';
import EnvoySelectedValuesRouteResponseBody from '../internal/EnvoySelectedValuesRouteResponseBody';

/**
 * Use to type your `res` object in Envoy event handlers.
 * @category Response
 */
export default interface EnvoyResponse<Body = unknown> extends Response {
  send: (body?: Body) => this;
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

/**
 * Use to type your `res` object in Envoy "options URL" route handlers.
 * @category Response
 */
export type EnvoyOptionsRouteResponse = EnvoyResponse<EnvoyOptionsRouteResponseBody>;

/**
 * Use to type your `res` object in Envoy "selected values URL" route handlers.
 * @category Response
 */
export type EnvoySelectedValuesRouteResponse = EnvoyResponse<EnvoySelectedValuesRouteResponseBody>;
