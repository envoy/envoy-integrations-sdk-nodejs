const request = require('request-promise-native');
const EnvoyResponseError = require('./EnvoyResponseError');

/**
 * @typedef {Object} EnvoyObject
 * @property {string|number|uuid} id - the ID of the object
 * @property {{}} attributes - the object's attributes, in dash-case.
 */

/**
 * @typedef {Object} Attachment
 * @property {string} type - only "password" supported :(
 * @property {string} label - the label to display in Garaje
 * @property {string} value - the value to display in Garaje
 */

/**
 * @typedef {Object} JobUpdate
 * @property {string} [status]
 * @property {string} [status_message]
 * @property {string} [failure_reason]
 * @property {Attachment[]} [attachments]
 */

/**
 * @typedef {Object} PluginStorageItem
 * @property {string} key
 * @property value
 */

/**
 * @typedef {Object} Command
 * @property {string} action - the type of command to run
 * @property {string} key - the key to operate on
 */

class EnvoyAPI {

  /**
   * @param {string} token
   */
  constructor(token) {

    if (!token) {
      throw new Error('No token supplied.');
    }

    this.baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    this.request = request.defaults({
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.api+json',
      },
      json: true,
      baseUrl: this.baseUrl,
    });
  }

  /**
   * Fetches the visitor types for this location.
   *
   * @param {string|number} locationId
   * @returns {Promise<EnvoyObject[]>}
   */
  async flows(locationId) {

    const body = await this.request({
      url: '/api/v3/flows',
      qs: {
        filter: {
          location: locationId,
        },
        include: 'location',
      },
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  /**
   * Fetches the sign-in page details for this flow.
   *
   * @param {string|number} flowId
   * @returns {Promise<EnvoyObject>}
   */
  async signInPage(flowId) {

    const body = await this.request({
      url: `/api/v3/flows/${flowId}/sign-in-field-page`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Fetches the sign-in fields for this page.
   *
   * @param {string|number} pageId
   * @returns {Promise<EnvoyObject[]>}
   */
  async signInFields(pageId) {

    const body = await this.request({
      url: `/api/v3/sign-in-field-pages/${pageId}/sign-in-fields`,
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  /**
   * Creates a notification event.
   *
   * @param {{}} event
   * @returns {Promise<EnvoyObject>}
   */
  async createNotificationEvent(event) {

    const body = await this.request({
      method: 'POST',
      url: '/api/v2/platform/notification-events',
      body: event,
    });

    return EnvoyAPI.getDataFromBody(body);
  }
  
    /**
   * Creates an invite event.
   *
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async createInvite(invite) {

    const body = await this.request({
      method: 'POST',
      url: '/api/v2/invites',
      body: invite,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Updates the job.
   *
   * @param {string|uuid} jobId
   * @param {JobUpdate} updates
   * @returns {Promise<EnvoyObject>}
   */
  async updateJob(jobId, updates) {

    const body = await this.request({
      method: 'PATCH',
      url: `/api/v2/plugin-services/jobs/${jobId}`,
      body: updates,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Runs the storage pipeline.
   *
   * @param {Command[]} commands
   * @param {string|uuid|number} [installId]
   * @returns {Promise<PluginStorageItem[]>}
   */
  async storagePipeline(commands, installId = null) {

    const request = { commands };
    if (installId) {
      request.install_id = installId;
    }
    const body = await this.request({
      method: 'POST',
      url: '/api/v2/plugin-services/storage',
      body: request,
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  static getDataFromBody(body, isValid = () => true) {

    /**
     * Valid response bodies look like:
     * { data: * }
     */
    if (body.data === undefined || !isValid(body.data)) {
      throw new EnvoyResponseError(body);
    }

    return body.data;
  }

  /**
   * Gets an access token using client_credentials as the grant type.
   *
   * @param {string} [id=process.env.ENVOY_CLIENT_ID]
   * @param {string} [secret=process.env.ENVOY_CLIENT_SECRET]
   */
  static login(id = process.env.ENVOY_CLIENT_ID, secret = process.env.ENVOY_CLIENT_SECRET) {
    const baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return request({
      auth: {
        user: id,
        pass: secret,
      },
      json: true,
      method: 'POST',
      body: {
        grant_type: 'client_credentials',
        client_id: id,
        client_secret: secret,
        scope: 'public,plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseUrl,
    });
  }
}

module.exports = EnvoyAPI;
