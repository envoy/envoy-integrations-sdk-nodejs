/**
 * @typedef {Object} Attachment
 * @property {string} [type] - only "password" supported :(
 * @property {string} label - the label to display in Garaje
 * @property {string} value - the value to display in Garaje
 */

class EnvoyPluginJob {

  /**
   * @param {EnvoyAPI} pluginAPI
   * @param {string|uuid} jobId
   */
  constructor(pluginAPI, jobId) {

    /**
     * @type {EnvoyAPI}
     */
    this.api = pluginAPI;
    /**
     * @type {string|uuid}
     */
    this.id = jobId;
  }

  /**
   * Updates a job.
   *
   * @param {string|null} status
   * @param {string|null} message
   * @param {string|null} [reason]
   * @param {Attachment[]|null} [attachments]
   * @returns {Promise<EnvoyObject>}
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
        updates.attachments = attachments.map(attachment => {
          if (!attachment.label || !attachment.value) {
            throw new Error('Attachments must be an array of objects: [{type, label, value}].');
          }
          return Object.assign({ type: 'password' }, attachment);
        });
      }
    }
    return this.api.updateJob(this.id, updates);
  }

  /**
   * Attaches items to an in-progress job.
   *
   * @param {...Attachment} attachments
   * @returns {Promise<EnvoyObject>}
   */
  attach(...attachments) {

    return this.execute(null, null, null, attachments);
  }

  /**
   * Completes the job.
   *
   * @param {string} message
   * @param {...Attachment} [attachments]
   * @returns {Promise<EnvoyObject>}
   */
  complete(message, ...attachments) {

    return this.execute('done', message, null, attachments);
  }

  /**
   * Ignores the job.
   *
   * @param {string} message
   * @param {string} reason
   * @returns {Promise<EnvoyObject>}
   */
  ignore(message, reason) {

    return this.execute('ignored', message, reason);
  }

  /**
   * Fails the job.
   *
   * @param {string} message
   * @param {string} reason
   * @returns {Promise<EnvoyObject>}
   */
  fail(message, reason) {

    return this.execute('failed', message, reason);
  }

  /**
   * Updates the job's message, with optional attachments.
   * Useful for multi-step jobs.
   *
   * @param message
   * @param {...Attachment} [attachments]
   * @returns {Promise<EnvoyObject>}
   */
  update(message, ...attachments) {

    return this.execute(null, message, null, attachments);
  }
}

module.exports = EnvoyPluginJob;
