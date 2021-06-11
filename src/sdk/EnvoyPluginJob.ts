import EnvoyPluginJobAttachment from './EnvoyPluginJobAttachment';
import EnvoyPluginJobUpdate from '../internal/EnvoyPluginJobUpdate';
import EnvoyPluginAPI from './EnvoyPluginAPI';

/**
 * A "job" is an event, like `entry_sign_in`.
 * When your plugin handles the event, you can use this job concept
 * to update the status (e.g. complete, failed, ignored)
 * as well as attach extra data to the event's subject
 * (e.g. showing a generated card number in the dashboard for a visitor on `entry_sign_in`).
 *
 * @category Request Object
 */
export default class EnvoyPluginJob {
  readonly api: EnvoyPluginAPI;

  readonly id: string;

  constructor(pluginAPI: EnvoyPluginAPI, jobId: string) {
    this.api = pluginAPI;
    this.id = jobId;
  }

  execute(
    status: string | null,
    message: string | null,
    reason: string | null,
    attachments: Array<EnvoyPluginJobAttachment> = [],
  ): Promise<void> {
    const updates: EnvoyPluginJobUpdate = {
      attachments: attachments.map((attachment) => ({ type: 'text', ...attachment })),
    };
    if (status) {
      Object.assign(updates, { status });
    }
    if (message) {
      Object.assign(updates, { status_message: message });
    }
    if (reason) {
      Object.assign(updates, { failure_reason: reason });
    }
    return this.api.updateJob(this.id, updates);
  }

  attach(...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute(null, null, null, attachments);
  }

  complete(message: string, ...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute('done', message, null, attachments);
  }

  ignore(message: string, reason: string): Promise<void> {
    return this.execute('ignored', message, reason);
  }

  fail(message: string, reason: string): Promise<void> {
    return this.execute('failed', message, reason);
  }

  update(message: string, ...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute(null, message, null, attachments);
  }
}
