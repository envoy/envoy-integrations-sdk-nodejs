const request = require('request-promise-native');
const axios = require('axios');
const EnvoyResponseError = require('./EnvoyResponseError');
const open = require('open');

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

    this.token = token;
    this.baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    this.newUrl = 'https://api.envoy.com/v1';
    // External OAuth login url
    this.envoyAuthUrl = 'https://app.envoy.com/a/auth/v0/authorize?response_type=code';

    //Request library is deprecated as of 2020. Proposing that we use Axios for future requests.
    this.request = request.defaults({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        'X-Envoy-Context': JSON.stringify(xEnvoyContext),
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

  async flow(flowId) {

    const body = await this.request({
      url: `/api/v3/flows/${flowId}`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  async locations() {

    const body = await this.request({
      url: `/api/v3/locations`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  async location(locationId) {

    const body = await this.request({
      url: `/api/v3/locations/${locationId}`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Deprecated
   */
  async company() {

    const body = await this.request({
      url: '/api/v1/companies',
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Retrieve details about an organization or account.
   * @returns {Promise<EnvoyObject[]>}
   */
  async companies() {
    var options = {
      method: 'GET',
      url: this.newUrl + `/companies`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Deprecated
   */
  async me() {

    const body = await this.request({
      url: '/api/v2/users/me',
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Deprecated
   */
  async companyRoles(userId) {

    const body = await this.request({
      url: `/api/v3/users/${userId}/relationships/company-roles`,
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  /**
   * Fetches the employees for this location.
   *
   * @param {string | number | object} params
   * @param {{
   *  ids: {string} A comma-separated list of IDs.
   *  name: {string} The full name of the employee. Allows partial search (e.g., "Ro"). Special characters and spaces should be URL-encoded
   *  email: {string} Email address. Allows partial search.
   *  page: {number} Controls which page to look at in the results
   *  perPage: {number} Controls how many results to show in each page of the results. Use with page.
   *  sort: {string} Controls which field should be compared to sort the results. Possible values are "NAME" or "EMAIL". Use with order.
   *  order: {string} Controls the sorting direction. Possible values are "ASC" and "DESC". Use with sort.
   * }} params Optional params if not looking up directly by ID.
   * @returns {Promise<EnvoyObject[]>}
   */
   async employees(params = {}) {
    let employeeUrl = this.newUrl + '/employees';
    let directIDLookup = false;
    if (typeof params === 'string' || typeof params === 'number') {
      employeeUrl = employeeUrl + `/${params}`;
      directIDLookup = true;
    } 

    var options = {
      method: 'GET',
      url: employeeUrl,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      qs: params, // If params is not an object, query params will be ignored as it is assumed you will be doing a lookup by id.
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });
    
    if (directIDLookup) return EnvoyAPI.getDataFromBody(body);
    else return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  /**
   * Deprecated. Use employees() instead.
   */
  async employee(companyRoleId) {

    const body = await this.request({
      url: `/api/v3/company-roles/${companyRoleId}/employee`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }


  /**
   * Import employee records to the Employee Directory. The file headers must be in the following order, Full Name, Email, Mobile Number, Assistants Email. 
   * Your .csv must list one employee per line, contain a unique email address for each employee, and match the format below. 
   * Mobile numbers and assistant email are optional.
   * Legacy API, this still works but will not be supported.
   * @param {file} file 
   * @returns 
   */
  async importEmployeeRecords(file) {
    var options = {
      'method': 'POST',
      'url': `https://app.envoy.com/api/configuration/employee_list`,
      'headers': {
        'Authorization': 'Bearer ' + this.token
      },
      formData: {
        'file': {
          'value': file,
          'options': {
            'filename': '',
            'contentType': null
          }
        }
      },
      json: true,
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return body;
  }


  /**
   * Deprecated. Use employees() and filter by location Ids of employees returned.
   * See employees() for list of optional params.
   * Fetches the employees for this location.
   * @param {string|number} locationId
   * @param {{}} params
   * @returns {Promise<EnvoyObject[]>}
   */
  async locationEmployees(locationId, params = {}) {

    const body = await this.request({
      url: `/api/v3/locations/${locationId}/employees`,
      qs: params,
    });

    return EnvoyAPI.getDataFromBody(body, data => Array.isArray(data));
  }

  /**
   * Deprecated. Use employees() instead.
   * Fetches an employee.
   * 
   * @param {string|number} employeeId
   * @returns {Promise<EnvoyObject>}
   */
  async locationEmployee(employeeId) {

    const body = await this.request({
      url: `/api/v3/employees/${employeeId}`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Fetches the sign-in page details for this flow.
   *
   * @param {string|number} flowId
   * @returns {Promise<EnvoyObject>}
   */
  async flowBadge(flowId) {

    const body = await this.request({
      url: `/api/v3/flows/${flowId}/badge`,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Deprecated.
   * Fetches the sign-in page details for this flow.
   *
   * @param {string|number} flowId
   * @returns {Promise<EnvoyObject>}
   */
  async signInPage(flowId, options = {}) {

    const body = await this.request({
      url: `/api/v3/flows/${flowId}/sign-in-field-page`,
      qs: options,
    });

    if (body.included) {
      return body.included;
    } else {
      return EnvoyAPI.getDataFromBody(body);
    }
  }

  /**
   * Deprecated. Use getSignInFields().
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
   * Fetches the sign-in fields for this flow.
   * @param { string | number } flowId 
   * @returns 
   */
  async getSignInFields(flowId) {
    const { included } = await this.request({
      url: `/api/v3/flows/${flowId}/sign-in-field-page`,
      qs: {
        include: 'sign-in-fields',
      },
    });

    return included;
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
   * Fetches an entry by id.
   * @param {string | number}} Entry Id
   */
  async entry(entryId) {
    const body = await this.request({
      method: 'GET',
      url: `/a/visitors/api/v2/entries/${entryId}`
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * 
   * @param {*} entry Query params in addition to dates to filter by.
   * entry = {
   *  location: { number },
   *  limit: { number },
   *  offset: { number },
   *  start_date: { string },
   *  end_date: { string }
   * }
   * 
   * start_date: '1900-01-31' (Example date String, same format for end_date)      
   * @returns {Promise<EnvoyObject>}
   */
  async getEntriesByDate(entry) {
    let params = `?filter[location]=${entry.location}&page[limit]=${entry.limit}&page[offset]=${entry.offset}&start_date=${entry.start_date}&end_date=${entry.end_date}`
    const body = await this.request({
      method: 'GET',
      url: `/a/visitors/api/v2/entries/${params}`
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /** 
   * @param {string | number} entryId
   * @param {{}} entry
   * @returns {Promise<EnvoyObject>}
   */
  async patchEntry(entryId, entry) {
    const body = await this.request({
      method: 'PATCH',
      url: `/a/visitors/api/v2/entries/${entry['entry-id']}`,
      body: entry
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /** 
   * Deprecated
   * Creates an entry.
   * 
   * If no errors are thrown an entry is succesfully created.
   * Unfortunately the endpoint no longer returns any data on success. Assume if no errors are thrown that an entry was created.
   * @param {{}} entry
   * @returns {Promise<EnvoyObject>}
   */
  async createEntry(entry) {
    const body = await this.request({
      method: 'POST',
      url: `/a/visitors/api/v2/entries`,
      body: entry
    })

    // Currently the route returns only a status code 204 for success. For now just return object indicating success.
    return {
      statusCode: 204,
    };
  }

  /**
   * Fetches a WorkSchedule.
   * @param { number | string } workSchedule Id.
   * @returns {Promise<EnvoyObject>}
   */
  async workSchedule(workScheduleId) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/work-schedules/${workScheduleId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true,
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Fetches a list of WorkSchedules.
   * @param {{}} workSchedule object.
   * @returns {Promise<EnvoyObject>}
   */
  async workSchedules(workSchedule) {
    var options = {
      method: 'GET',
      url: this.newUrl + '/work-schedules',
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: workSchedule,
      json: true,
    };
    
    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Create a new work schedule for an employee.
   * @param {{}} workSchedule - Work object with locationId, email, expectedArrivalAt (UTC date time format)
   * @returns {Promise<EnvoyObject>}
   */
  async createWorkSchedule(workSchedule) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/work-schedules`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: {
        'workSchedule': workSchedule
      },
      json: true,
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Deletes a work schedule item. Returns prev item to be deleted on success.
   * @param {{}} workSchedule object.
   * @returns {Promise<EnvoyObject>}
   */
  async deleteWorkSchedule(workScheduleId) {
    var options = {
      method: 'DELETE',
      url: this.newUrl + `/work-schedules/${workScheduleId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await this.workSchedule(workScheduleId);
    await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    body.message = "Work Schedule has been removed.";
    return body;
  }

  /**
   * Check in a certain work schedule item.
   * @param { number | string } workSchedule Id
   * @returns {Promise<EnvoyObject>}
   */
  async checkInWork(workScheduleId) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/work-schedules/${workScheduleId}/checkin`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    // Returns status 204 so body has no content.
    return { message: 'Successfully checked in.' }
  }

  /**
   * Check out a certain work schedule item.
   * @param { number | string } workSchedule Id
   * @returns {Promise<EnvoyObject>}
   */
  async checkOutWork(workScheduleId) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/work-schedules/${workScheduleId}/checkout`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    // Returns status 204 so body has no content.
    return { message: 'Successfully checked out.' }
  }

  /**
   * @param { number|string } Invite ID.
   * @returns {Promise<EnvoyObject>}
   */
  async getInvite(inviteId) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/invites/${inviteId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }


  /**
   * @param { {} } invite Object containing query params. See invites API documentation for list of all possbile Query params.
   * @returns {Promise<EnvoyObject>}
   */
  async getInvites(invite) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/invites`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      qs: invite,
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Creates an invite.
   *
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async createInvite(invite) {

    const body = await this.request({
      method: 'POST',
      url: '/api/v3/invites',
      body: invite,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Create an invite using the V1 API endpoint.
   *
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async createInviteV1(invite) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/invites`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: invite,
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
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
    const body = await this.request({
      method: 'PUT',
      url: `/api/v3/invites/${inviteId}`,
      body: invite,
    });

    return EnvoyAPI.getDataFromBody(body);
  }
  /**
   * Updates an invite using the V1 API endpoint.
   *
   * @param { number|string } inviteId
   * @param {{}} invite
   * @returns {Promise<EnvoyObject>}
   */
  async updateInviteV1(inviteId, invite) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/invites/${inviteId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: invite,
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
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
    const body = await this.request({
      method: 'PATCH',
      url: `/api/v3/invites/${inviteId}`,
      body: invite,
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Removes an invite
   *
   * @param inviteId
   * @returns {Promise<void>}
   */
  async removeInvite(inviteId) {
    return this.request({
      method: 'DELETE',
      url: `/api/v3/invites/${inviteId}`,
    });
  }

  /**
   * Removes an invite using the V1 API endpoint.
   *
   * @param { number|string } inviteId
   * @returns {Promise<EnvoyObject>}
   */
  async removeInviteV1(inviteId) {
    var options = {
      method: 'DELETE',
      url: this.newUrl + `/invites/${inviteId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Get a reservation by Id.
   * @params { number|string }
   * @returns {Promise<EnvoyObject[]>}
   */
  async reservation(resId) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/reservations/${resId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Get reservations.
   * @returns {Promise<EnvoyObject[]>}
   */
  async reservations(resParams) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/reservations`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Create a reservation
   * @params { {} } A reservation object containing body params.
   * @returns {Promise<EnvoyObject[]>}
   */
  async createReservation(reservation) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/reservations`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      body: reservation,
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Check in a reservation
   * @params { number|string } Reservation Id.
   * @returns {Promise<EnvoyObject[]>}
   */
  async checkInReservation(resId) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/reservations/${resId}/checkin`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Check out a reservation
   * @params { number|string } Reservation Id.
   * @returns {Promise<EnvoyObject[]>}
   */
  async checkOutReservation(resId) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/reservations/${resId}/checkout`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Cancel a reservation
   * @params { number|string } Reservation Id.
   * @returns {Promise<EnvoyObject[]>}
   */
  async cancelReservation(resId) {
    var options = {
      method: 'POST',
      url: this.newUrl + `/reservations/${resId}/cancel`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Get a space by Id.
   * @params { number|string }
   * @returns {Promise<EnvoyObject[]>}
   */
  async space(spaceId) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/spaces/${spaceId}`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
    });

    return EnvoyAPI.getDataFromBody(body);
  }

  /**
   * Get all spaces with option query params to further filter results.
   * @params { {} } Object containing query params.
   * @returns {Promise<EnvoyObject[]>}
   */
  async spaces(space) {
    var options = {
      method: 'GET',
      url: this.newUrl + `/spaces`,
      headers: {
        Authorization: 'Bearer ' + this.token
      },
      qs: space,
      json: true
    };

    const body = await request(options, function (error, response) {
      if (error) throw new Error(error);
      response.body;
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
   * Gets the plugin install's config.
   *
   * @param {number} installId
   * @returns {Promise<{}>}
   */
  async getPluginInstallConfig(installId) {
    return new Promise((resolve, reject) => {
      this.request({
        method: 'GET',
        url: `/api/v2/plugin-services/installs/${installId}/config`,
      }).then(body => resolve(EnvoyAPI.getDataFromBody(body)))
        .catch(err => reject(err));
    });
  }

  /**
   * Sets the plugin install's config.
   *
   * @param {number} installId
   * @param {{}} config
   * @returns {Promise<{}>}
   */
  async setPluginInstallConfig(installId, config = {}) {
    const body = await this.request({
      method: 'PUT',
      url: `/api/v2/plugin-services/installs/${installId}/config`,
      body: config,
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

  async createNotification(installId, params = {}) {
    const body = await this.request({
      method: 'POST',
      url: `/api/v2/plugin-services/installs/${installId}/notifications`,
      body: params,
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
        scope: 'plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseUrl,
    });
  }

  static loginAsUser(
    username,
    password,
    id = process.env.ENVOY_CLIENT_ID,
    secret = process.env.ENVOY_CLIENT_SECRET,
  ) {
    const baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return request({
      auth: {
        user: id,
        pass: secret,
      },
      json: true,
      method: 'POST',
      body: {
        grant_type: 'password',
        username,
        password,
        scope: 'plugin,token.refresh',
      },
      url: '/a/auth/v0/token',
      baseUrl,
    });
  }

  static loginAsPluginInstaller(
    installId,
    id = process.env.ENVOY_CLIENT_ID,
    secret = process.env.ENVOY_CLIENT_SECRET,
  ) {
    const baseUrl = process.env.ENVOY_BASE_URL || 'https://app.envoy.com';
    return request({
      auth: {
        user: id,
        pass: secret,
      },
      json: true,
      method: 'POST',
      body: {
        grant_type: 'plugin_install',
        install_id: installId,
      },
      url: '/a/auth/v0/token',
      baseUrl,
    });
  }

  /**
   * Get acccess token from auth code provided by external OAuth redirect url.
   * @param {string} authCode 
   * @returns {object} Tokens object.
   */
  static async getAccessTokenFromAuthCode(authCode) {
    const response = await axios.post(
      ENVOY_AUTH_URL,
      {
        'grant_type': 'authorization_code',
        'code': authCode,
        'client_id': process.env.ENVOY_CLIENT_ID,
        'client_secret': process.env.ENVOY_CLIENT_SECRET,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then(res => {
      return res.data;
    }).catch(error => {
      return error;
    });

    if (response.access_token) {
      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        accessTokenExp: Date.now() + response.expires_in,
        refreshTokenExp: Date.now() + response.refresh_token_expires_in,
      }
    } else {
      return response;
    }
  }

  /**
  * 
  * @param { string } refreshToken 
  * @returns {object} Tokens object.
  */
  static async refreshAccessToken(refreshToken) {
    const response = await axios.post(
      ENVOY_AUTH_URL,
      {
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        'client_id': process.env.ENVOY_CLIENT_ID,
        'client_secret': process.env.ENVOY_CLIENT_SECRET,
      },
      {

        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      return res.data;
    }).catch(error => {
      return {
        status: error.response.status,
        error: error.response.data.error,
      }
    });

    if (response.accessToken) {
      return {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        accessTokenExp: Date.now() + response.expires_in,
        refreshTokenExp: Date.now() + response.refresh_token_expires_in,
      }
    } else return response;
  }
}

module.exports = EnvoyAPI;