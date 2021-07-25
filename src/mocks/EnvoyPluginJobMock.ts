import isMatch from 'lodash.ismatch';
import EnvoyPluginJob from '../sdk/EnvoyPluginJob';
import EnvoyPluginAPI from '../sdk/EnvoyPluginAPI';
import EnvoyPluginJobUpdate from '../internal/EnvoyPluginJobUpdate';
import EnvoyPluginJobAttachment from '../sdk/EnvoyPluginJobAttachment';

export default class EnvoyPluginJobMock extends EnvoyPluginJob {
  constructor(pluginAPI: EnvoyPluginAPI, jobId: string) {
    super(pluginAPI, jobId);
    this.api.updateJob = (id, updates) => {
      EnvoyPluginJobMock.updates.push(updates);
      return Promise.resolve();
    };
  }

  private static updates: Array<EnvoyPluginJobUpdate> = [];

  static attachmentLike(partialAttachment: Partial<EnvoyPluginJobAttachment>) {
    return EnvoyPluginJobMock.updates.find(
      ({ attachments }) => attachments.find(
        (attachment) => isMatch(attachment, partialAttachment),
      ),
    );
  }

  static get lastStatus() {
    return [...EnvoyPluginJobMock.updates].reverse().find(({ status }) => !!status);
  }

  static reset() {
    EnvoyPluginJobMock.updates = [];
  }
}
