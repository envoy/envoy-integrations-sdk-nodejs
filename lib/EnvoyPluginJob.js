
class EnvoyPluginJob {

  /**
   * @param {EnvoyAPI} pluginAPI
   * @param jobId
   */
  constructor(pluginAPI, jobId) {

    this.api = pluginAPI;
    this.id = jobId;
  }

  /**
   * Updates a job.
   *
   * @param {string|null} status
   * @param {string|null} message
   * @param {string|null} reason
   * @param {[{}]|null} [attachments]
   * @returns {Promise<*>}
   */
  execute(status, message, reason, attachments = []) {

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
    if (attachments) {
      if (!Array.isArray(attachments)) {
        throw new Error('Attachments must be an array of objects: [{type, label, value}].');
      }
      if (attachments.length) {
        attachments.forEach(attachment => {
          if (!attachment.type || !attachment.label || !attachment.value) {
            throw new Error('Attachments must be an array of objects: [{type, label, value}].');
          }
        });
        updates.attachments = attachments;
      }
    }
    return this.api.updateJob(this.id, updates);
  }

  /**
   * Attaches items to an in-progress job.
   *
   * @param attachments
   * @returns {Promise<*>}
   */
  attach(...attachments) {

    return this.execute(null, null, null, attachments);
  }

  /**
   * Completes the job.
   *
   * @param {string} message
   * @param [attachments]
   * @returns {Promise<*>}
   */
  complete(message, ...attachments) {

    return this.execute('done', message, null, attachments);
  }

  /**
   * Ignores the job.
   *
   * @param {string} message
   * @param {string} reason
   * @returns {Promise<*>}
   */
  ignore(message, reason) {

    return this.execute('ignored', message, reason);
  }

  /**
   * Fails the job.
   *
   * @param {string} message
   * @param {string} reason
   * @returns {Promise<*>}
   */
  fail(message, reason) {

    return this.execute('failed', message, reason);
  }
}

module.exports = EnvoyPluginJob;
