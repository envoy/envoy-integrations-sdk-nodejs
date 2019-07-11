
class EnvoyPluginJob {

  constructor(pluginAPI, jobId) {

    this.api = pluginAPI;
    this.id = jobId;
  }

  /**
   * Updates a job.
   *
   * @param status
   * @param message
   * @param reason
   * @param attachments
   * @returns {Promise<*>}
   */
  execute(status, message, reason, attachments) {

    const updates = {};
    if (status) {
      updates.status = status;
    }
    if (message) {
      updates.status_message = message;
    }
    if (reason) {
      updates.failure_reason = reason;
    }
    if (Array.isArray(attachments) && attachments.length) {
      updates.attachments = attachments;
    }
    return this.api.updateJob(this.id, updates);
  }

  /**
   * Attaches items to an in-progress job.
   *
   * @param {[]} attachments
   * @returns {Promise<*>}
   */
  attach(attachments) {

    return this.execute(null, null, null, attachments);
  }

  /**
   * Completes the job.
   *
   * @param message
   * @param [attachments]
   * @returns {Promise<*>}
   */
  complete(message, attachments = []) {

    return this.execute('done', message, null, attachments);
  }

  /**
   * Ignores the job.
   *
   * @param message
   * @param reason
   * @param [attachments]
   * @returns {Promise<*>}
   */
  ignore(message, reason, attachments = []) {

    return this.execute('ignored', message, reason, attachments);
  }

  /**
   * Fails the job.
   *
   * @param message
   * @param reason
   * @param [attachments]
   * @returns {Promise<*>}
   */
  fail(message, reason, attachments = []) {

    return this.execute('failed', message, reason, attachments);
  }
}

module.exports = EnvoyPluginJob;
