import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';

/**
 * @internal
 */
export default interface EnvoyPluginJobUpdate {
  status?: string,
  status_message?: string,
  failure_reason?: string,
  attachments: Array<EnvoyPluginJobAttachment>,
}
