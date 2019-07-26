const EnvoyPluginStoragePipeline = require('./EnvoyPluginStoragePipeline');

class EnvoyPluginStorage {

  /**
   * @param {EnvoyAPI} pluginAPI
   * @param [installId]
   */
  constructor(pluginAPI, installId = null) {

    this.api = pluginAPI;
    this.installId = installId;
  }

  /**
   * Creates a new pipeline instance.
   *
   * @returns {EnvoyPluginStoragePipeline}
   */
  pipeline() {

    return new EnvoyPluginStoragePipeline(this.api, this.installId);
  }

  /**
   * Wrapper for single pipeline get.
   *
   * @param {string} key
   * @returns {Promise<*>}
   */
  get(key) {

    return this.pipeline().get(key).executeSingle();
  }

  /**
   * Wrapper for single pipeline set.
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise<*>}
   */
  set(key, value) {

    return this.pipeline().set(key, value).executeSingle();
  }

  /**
   * Wrapper for single pipeline setUnique.
   *
   * @param {string} key
   * @param {{}} options
   * @returns {Promise<*>}
   */
  setUnique(key, options = {}) {

    return this.pipeline().setUnique(key, options).executeSingle();
  }

  /**
   * Wrapper for single pipeline unset.
   *
   * @param {string} key
   * @returns {Promise<*>}
   */
  unset(key) {

    return this.pipeline().unset(key).executeSingle();
  }
}

module.exports = EnvoyPluginStorage;
