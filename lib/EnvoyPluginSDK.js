const EnvoyAPI = require('./EnvoyAPI');
const EnvoyJWT = require('./EnvoyJWT');
const EnvoyPluginStorage = require('./EnvoyPluginStorage');
const EnvoyPluginJob = require('./EnvoyPluginJob');

/**
 * @typedef {Object} EnvoyObject
 * @property {string|number|uuid} id - the ID of the object
 * @property {{}} attributes - the object's attributes, in dash-case.
 */

/**
 * @typedef {Object} Meta
 * @property {string} event - the name of the event
 * @property {string} route - the name of the route
 * @property {number} plugin_id - the plugin ID
 * @property {number} install_id - the plugin install ID
 * @property {Object} env - config data for this install
 * @property {EnvoyObject} location - the location this event happened
 * @property {EnvoyObject} company - the company that installed the plugin
 * @property {string} forwarded_bearer_token - the Garaje user's token
 */

class EnvoyPluginSDK {

  /**
   * Usually comes from req.body in Express.
   * @param {{}} body
   * @param {boolean} [isVerified]
   * @param {string} [pluginAccessToken]
   */
  constructor(body, isVerified = false, pluginAccessToken = null) {

    /**
     * @type {{}}
     */
    this.body = body;
    /**
     * @type {boolean}
     */
    this.isVerified = isVerified;
    /**
     * @type {string}
     */
    this.pluginAccessToken = pluginAccessToken;
  }

  /**
   * The request_meta of the platform_event.
   *
   * @returns {Meta}
   */
  get meta() {

    if (!this.isVerified) {
      throw new Error('Could not verify meta.');
    }
    return this.body.meta;
  }

  /**
   * The request_body of the platform_event.
   *
   * @returns {{}|EnvoyObject}
   */
  get payload() {

    if (!this.isVerified) {
      throw new Error('Could not verify payload.');
    }
    return this.body.payload;
  }

  /**
   * Envoy API scoped to the user.
   * Used only in routes.
   *
   * @returns {EnvoyAPI}
   */
  get userAPI() {

    const { forwarded_bearer_token: token, auth } = this.meta;
    const accessToken = token || (auth ? auth.access_token : null);
    if (!accessToken) {
      throw new Error("This user's API token was not found. Are you in a route?");
    }
    return new EnvoyAPI(accessToken);
  }

  /**
   * Envoy API scoped to the plugin.
   * Used to perform storage or job operations.
   *
   * @returns {EnvoyAPI}
   */
  get pluginAPI() {

    const { pluginAccessToken } = this;
    if (!pluginAccessToken) {
      throw new Error('No API token found. Are your Envoy client ID and secret set?');
    }
    return new EnvoyAPI(pluginAccessToken);
  }

  /**
   * Storage scoped to the install.
   *
   * @returns {EnvoyPluginStorage}
   */
  get installStorage() {

    const { install_id: installId } = this.meta;
    if (!installId) {
      throw new Error('No install ID found in meta.');
    }
    return this.getStorage(installId);
  }

  /**
   * Storage scoped globally (across installs).
   *
   * @returns {EnvoyPluginStorage}
   */
  get globalStorage() {

    return this.getStorage();
  }

  /**
   * Perform operations on the current job.
   *
   * @returns {EnvoyPluginJob}
   */
  get job() {

    const { jobId } = this;
    if (!jobId) {
      throw new Error('No job found in meta. Are you in a worker?');
    }
    return this.getJob(jobId);
  }

  /**
   * Returns the current job's ID.
   *
   * @returns {string|uuid|null}
   */
  get jobId() {
    const { job } = this.meta;
    return job ? job.id : null;
  }

  /**
   * A utility to encode and decode JWTs.
   * Useful for verifiable communications between plugin endpoints.
   *
   * @returns {EnvoyJWT}
   */
  get jwt() {

    const { JWT_SECRET: secret } = process.env;
    if (!secret) {
      throw new Error('No JWT_SECRET environment variable set.');
    }
    return new EnvoyJWT(secret);
  }

  /**
   * Returns a job based on an ID.
   *
   * @returns {Function}
   */
  get getJob() {

    /**
     * @param {string|uuid} jobId
     * @returns {EnvoyPluginJob}
     */
    return jobId => new EnvoyPluginJob(this.pluginAPI, jobId);
  }

  get getStorage() {

    /**
     * @param {string|number} installId
     * @returns {EnvoyPluginStorage}
     */
    return (installId = null) => new EnvoyPluginStorage(this.pluginAPI, installId);
  }
}

module.exports = EnvoyPluginSDK;
