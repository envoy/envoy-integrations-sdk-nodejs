const axios = require('axios');
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
  constructor(token, xEnvoyContext = {}) {

    if (!token) {
      throw new Error('No token supplied.');
    }

    this.baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    this.request = axios.create({
      baseURL: this.baseUrl,
      family: 4, // Force IPv4 to maintain backwards compatibility with request-promise-native-based implementation
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'X-Envoy-Context': JSON.stringify(xEnvoyContext),
      },
    });
  }

  /**
   * Fetches the visitor types for this location.
   *
   * @param {string|number} locationId
   * @returns {Promise<EnvoyObject[]>}
   */
  async flows(locationId) {

    const body = await this.request.get('/api/v3/flows', {
      params: {
        filter: {
          location: locationId,
        },
        include: 'location',
      },
    }).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data, data => Array.isArray(data));
  }

  async flow(flowId) {

    const body = await this.request.get(`/api/v3/flows/${flowId}`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }
  
  async locations() {

    const body = await this.request.get('/api/v3/locations').catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }
  
  async location(locationId) {

    const body = await this.request.get(`/api/v3/locations/${locationId}`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }
  
  async company() {

    const body = await this.request.get('/api/v2/companies').catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  async me() {

    const body = await this.request.get('/api/v2/users/me').catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  async companyRoles(userId) {

    const body = await this.request.get(`/api/v3/users/${userId}/relationships/company-roles`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data, data => Array.isArray(data));
  }

  async employee(companyRoleId) {

    const body = await this.request.get(`/api/v3/company-roles/${companyRoleId}/employee`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Fetches the employees for this location.
   *
   * @param {string|number} locationId
   * @param {{}} params
   * @returns {Promise<EnvoyObject[]>}
   */
  async locationEmployees(locationId, params = {}) {

    const body = await this.request.get(`/api/v3/locations/${locationId}/employees`, {
      params,
    }).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data, data => Array.isArray(data));
  }

  /**
   * Fetches an employee.
   *
   * @param {string|number} employeeId
   * @returns {Promise<EnvoyObject>}
   */
  async locationEmployee(employeeId) {

    const body = await this.request.get(`/api/v3/employees/${employeeId}`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Fetches the sign-in page details for this flow.
   *
   * @param {string|number} flowId
   * @returns {Promise<EnvoyObject>}
   */
  async flowBadge(flowId) {

    const body = await this.request.get(`/api/v3/flows/${flowId}/badge`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Fetches the sign-in page details for this flow.
   *
   * @param {string|number} flowId
   * @returns {Promise<EnvoyObject>}
   */
  async signInPage(flowId) {

    const body = await this.request.get(`/api/v3/flows/${flowId}/sign-in-field-page`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Fetches the sign-in fields for this page.
   *
   * @param {string|number} pageId
   * @returns {Promise<EnvoyObject[]>}
   */
  async signInFields(pageId) {

    const body = await this.request.get(`/api/v3/sign-in-field-pages/${pageId}/sign-in-fields`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data, data => Array.isArray(data));
  }

  /**
   * Creates a notification event.
   *
   * @param {{}} event
   * @returns {Promise<EnvoyObject>}
   */
  async createNotificationEvent(event) {

    const body = await this.request.post('/api/v2/platform/notification-events', event).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Creates an invite.
   *
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async createInvite(invite) {

    const body = await this.request.post('/api/v3/invites', invite).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Updates an invite.
   *
   * @param inviteId
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async updateInvite(inviteId, invite) {

    // eslint-disable-next-line no-param-reassign
    invite.data.id = inviteId;
    const body = await this.request.put(`/api/v3/invites/${inviteId}`, invite).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Updates an invite.
   *
   * @param inviteId
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async partialUpdateInvite(inviteId, invite) {

    // eslint-disable-next-line no-param-reassign
    invite.data.id = inviteId;
    const body = await this.request.patch(`/api/v3/invites/${inviteId}`, invite).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Removes an invite.
   *
   * @param inviteId
   * @returns {Promise<void>}
   */
  async removeInvite(inviteId) {
    return this.request.delete(`/api/v3/invites/${inviteId}`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
  }

  /**
   * Updates the job.
   *
   * @param {string|uuid} jobId
   * @param {JobUpdate} updates
   * @returns {Promise<EnvoyObject>}
   */
  async updateJob(jobId, updates) {

    const body = await this.request.patch(`/api/v2/plugin-services/jobs/${jobId}`, updates).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Gets the plugin install's config.
   *
   * @param {number} installId
   * @returns {Promise<{}>}
   */
  async getPluginInstallConfig(installId) {
    const body = await this.request.get(`/api/v2/plugin-services/installs/${installId}/config`).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
    
    return EnvoyAPI.getDataFromBody(body.data);
  }

  /**
   * Sets the plugin install's config.
   *
   * @param {number} installId
   * @param {{}} config
   * @returns {Promise<{}>}
   */
  async setPluginInstallConfig(installId, config = {}) {
    const body = await this.request.put(`/api/v2/plugin-services/installs/${installId}/config`, config).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data);
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
    const body = await this.request.post('/api/v2/plugin-services/storage', request).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });

    return EnvoyAPI.getDataFromBody(body.data, data => Array.isArray(data));
  }

  async createNotification(installId, params = {}) {
    const body = await this.request.post(`/api/v2/plugin-services/installs/${installId}/notifications`, params).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
    return EnvoyAPI.getDataFromBody(body.data);
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
    const baseURL = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return axios({
      auth: {
        username: id,
        password: secret,
      },
      family: 4,
      method: 'POST',
      data: {
        grant_type: 'client_credentials',
        client_id: id,
        client_secret: secret,
        scope: 'plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseURL,
    }).then(response => response.data).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
  }

  static loginAsUser(
    username,
    password,
    id = process.env.ENVOY_CLIENT_ID,
    secret = process.env.ENVOY_CLIENT_SECRET,
  ) {
    const baseURL = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return axios({
      auth: {
        username: id,
        password: secret,
      },
      family: 4,
      method: 'POST',
      data: {
        grant_type: 'password',
        username,
        password,
        scope: 'plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseURL,
    }).then(response => response.data).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
  }

  static loginAsPluginInstaller(
    installId,
    id = process.env.ENVOY_CLIENT_ID,
    secret = process.env.ENVOY_CLIENT_SECRET,
  ) {
    const baseURL = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return axios({
      auth: {
        username: id,
        password: secret,
      },
      family: 4,
      method: 'POST',
      data: {
        grant_type: 'plugin_install',
        install_id: installId,
      },
      url: '/a/auth/v0/token',
      baseURL,
    }).then(response => response.data).catch((error) => {
      return EnvoyAPI.safeRequestsError(error);
    });
  }

  static safeRequestsError(error) {
    // Strip sensitive info and match the previous request-promise-native behavior:
    // - HTTP errors: StatusCodeError name with format "${status} - ${responseBody}"
    // - Network errors: Keep as "Error" name
    // - Preserve original message format and response data
    
    let errorName = error.name || error.constructor?.name;
    let message = error.message;
    let code = error.code;
    
    if (error.response) {
      // HTTP errors: request-promise-native uses "StatusCodeError" for 404s, etc.
      errorName = 'StatusCodeError';
      code = error.response.status;
      
      // Match request-promise-native message format: "${status} - ${responseBody}"
      let responseBody = 'undefined';
      if (error.response.data !== undefined && error.response.data !== null && error.response.data !== '') {
        if (typeof error.response.data === 'string') {
          responseBody = error.response.data;
        } else {
          responseBody = JSON.stringify(error.response.data);
        }
      }
      message = `${error.response.status} - ${responseBody}`;
    } else if (error.code) {
      // Network/system errors: request-promise-native uses "RequestError"
      errorName = 'RequestError';
      code = undefined;
      
      if (!message.startsWith('Error: ')) {
        message = `Error: ${message}`;
      }
    }
    
    const safeError = {
      code,
      message,
      name: errorName,
      baseURL: error.config?.baseURL,
      url: error.config?.url,
      method: error.config?.method,
      stack: error.stack,
    }
    throw safeError;
  }
}

module.exports = EnvoyAPI;
