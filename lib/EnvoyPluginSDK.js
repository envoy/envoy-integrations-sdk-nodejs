const EnvoyAPI = require('./EnvoyAPI');
const EnvoyJWT = require('./EnvoyJWT');
const EnvoyPluginStorage = require('./EnvoyPluginStorage');
const EnvoyPluginJob = require('./EnvoyPluginJob');

class EnvoyPluginSDK {

  /**
   * Usually comes from req.body in Express.
   * @param {{}} body
   */
  constructor(body) {

    const { meta, payload } = body;
    this.meta = Object.freeze(meta); // equivalent to platform_event request_meta
    this.payload = Object.freeze(payload); // equivalent to platform_event request_body
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

    const { job } = this.meta;
    if (!job) {
      throw new Error('No job found in meta. Are you in a worker?');
    }
    return new EnvoyPluginJob(this.pluginAPI, job.id);
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
}

module.exports = EnvoyPluginSDK;
