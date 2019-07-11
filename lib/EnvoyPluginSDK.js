const EnvoyAPI = require('./EnvoyAPI');
const EnvoyJWT = require('./EnvoyJWT');
const EnvoyPluginStorage = require('./EnvoyPluginStorage');
const EnvoyPluginJob = require('./EnvoyPluginJob');

class EnvoyPluginSDK {

  constructor(body) {

    const { meta, payload } = body;
    const { install_id: installId, job } = meta;
    this.meta = meta;
    this.payload = payload;
    this.userScopedAPI = null;
    this.pluginScopedAPI = null;
    this.installStorage = new EnvoyPluginStorage(this.pluginAPI, installId);
    this.globalStorage = new EnvoyPluginStorage(this.pluginAPI);
    this.job = job ? new EnvoyPluginJob(this.pluginAPI, job.id) : null;
    this.jwt = new EnvoyJWT();
  }

  /**
   * Returns an API scoped to the user.
   * Used only in routes.
   *
   * @returns {EnvoyAPI}
   */
  get userAPI() {

    if (!this.userScopedAPI) {

      const { forwarded_bearer_token: userAPIToken } = this.meta;

      if (!userAPIToken) {
        throw new Error("This user's API token was not found. Are you in a route or a worker?");
      }
      this.userScopedAPI = new EnvoyAPI(userAPIToken);
    }
    return this.userScopedAPI;
  }

  /**
   * Returns an API scoped to the plugin.
   * Used to perform storage or job operations.
   *
   * @returns {EnvoyAPI}
   */
  get pluginAPI() {

    if (!this.pluginScopedAPI) {

      const { ENVOY_API_TOKEN: envoyAPIToken } = process.env;

      if (!envoyAPIToken) {
        throw new Error('No API token found in the ENVOY_API_TOKEN environment variable.');
      }
      this.pluginScopedAPI = new EnvoyAPI(envoyAPIToken);
    }
    return this.pluginScopedAPI;
  }
}

module.exports = EnvoyPluginSDK;
