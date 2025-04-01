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
  protected readonly api: EnvoyPluginAPI;

  readonly id: string;

  constructor(pluginAPI: EnvoyPluginAPI, jobId: string) {
    this.api = pluginAPI;
    this.id = jobId;
  }

  private execute(
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

  /**
   * Add attachments to this job.
   */
  attach(...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute(null, null, null, attachments);
  }

  /**
   * Reports that the job is complete.
   *
   * Instead of calling this directly, you can return a 200 response from the job's event handler,
   * using {@link EnvoyRequest.send}.
   */
  complete(message: string, ...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute('done', message, null, attachments);
  }

  /**
   * Reports that the job is ignored.
   *
   * Instead of calling this directly, you can return a 400 response from the job's event handler,
   * using {@link EnvoyRequest.sendIgnored}.
   */
  ignore(message: string, reason: string): Promise<void> {
    return this.execute('ignored', message, reason);
  }

  /**
   * Reports that the job is ignored.
   *
   * Instead of calling this directly, you can return a 400 response from the job's event handler,
   * using {@link EnvoyRequest.sendFailed}.
   */
  fail(message: string, reason: string): Promise<void> {
    return this.execute('failed', message, reason);
  }

  /**
   * Updates the job with a new message and attachments.
   *
   * Can be used to periodically update long-running jobs.
   */
  update(message: string, ...attachments: Array<EnvoyPluginJobAttachment>): Promise<void> {
    return this.execute(null, message, null, attachments);
  }
}
