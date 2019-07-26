const EnvoyAPI = require('./EnvoyAPI');
const EnvoyJWT = require('./EnvoyJWT');
const EnvoyPluginStorage = require('./EnvoyPluginStorage');
const EnvoyPluginJob = require('./EnvoyPluginJob');

class EnvoyPluginSDK {

  /**
   * Usually comes from req.body in Express.
   * @param {{}} body
   * @param {boolean} isVerified
   */
  constructor(body, isVerified = false) {

    this.body = body;
    this.isVerified = isVerified;
  }

  /**
   * The request_meta of the platform_event.
   *
   * @returns {{}}
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
   * @returns {{}}
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

    const { forwarded_bearer_token: token } = this.meta;
    if (!token) {
      throw new Error("This user's API token was not found. Are you in a route?");
    }
    return new EnvoyAPI(token);
  }

  /**
   * Envoy API scoped to the plugin.
   * Used to perform storage or job operations.
   *
   * @returns {EnvoyAPI}
   */
  get pluginAPI() {

    const { ENVOY_API_TOKEN: token } = process.env;
    if (!token) {
      throw new Error('No API token found in the ENVOY_API_TOKEN environment variable.');
    }
    return new EnvoyAPI(token);
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
    return new EnvoyPluginStorage(this.pluginAPI, installId);
  }

  /**
   * Storage scoped globally (across installs).
   *
   * @returns {EnvoyPluginStorage}
   */
  get globalStorage() {

    return new EnvoyPluginStorage(this.pluginAPI);
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

  getJob(jobId) {

    return new EnvoyPluginJob(this.pluginAPI, jobId);
  }
}

module.exports = EnvoyPluginSDK;
