const request = require('request-promise-native');
const EnvoyResponseError = require('./EnvoyResponseError');

class EnvoyAPI {

  constructor(token) {

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

  async signInPage(flowId) {

    const body = await this.axios({
      url: `/api/v3/flows/${flowId}/sign-in-field-page`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  async signInFields(pageId) {

    const body = await this.axios({
      url: `/api/v3/sign-in-field-pages/${pageId}/sign-in-fields`,
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  async createNotificationEvent(event) {

    const body = await this.request({
      method: 'POST',
      url: '/api/v2/platform/notification-events',
      body: event,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  async updateJob(jobId, updates) {

    return this.request({
      method: 'PUT',
      url: `/api/v2/plugin-services/jobs/${jobId}`,
      body: updates,
    });
  }

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

    return EnvoyAPI.getDataFromBody(body);
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
}

module.exports = EnvoyAPI;
