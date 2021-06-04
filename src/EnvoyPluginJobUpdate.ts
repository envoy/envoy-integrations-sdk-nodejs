import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';

export default interface EnvoyPluginJobUpdate {
  status?: string,
  status_message?: string,
  failure_reason?: string,
  attachments: Array<EnvoyPluginJobAttachment>,
}
