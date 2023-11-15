const EnvoyPluginStoragePipeline = require('./EnvoyPluginStoragePipeline');

/**
 * @typedef {Object} PluginStorageItem
 * @property {string} key
 * @property value
 */

/**
 * @typedef {Object} UniqueOptions
 * @property {string} chars="0123456789" - the possible characters to pick from
 * @property {number} size=12 - the length of the value
 */

/**
 * @typedef {Object} UniqueNumOptions
 * @property {number} min=0 - the minimum number to pick from
 * @property {number} max=Number.MAX_SAFE_INTEGER - the maximum number to pick from
 */

class EnvoyPluginStorage {

  /**
   * @param {EnvoyAPI} pluginAPI
   * @param {number|null} [installId]
   */
  constructor(pluginAPI, installId = null) {

    /**
     * @type {EnvoyAPI}
     */
    this.api = pluginAPI;
    /**
     * @type {number|null}
     */
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
   * @returns {Promise<PluginStorageItem|null>}
   */
  get(key) {

    return this.pipeline().get(key).executeSingle();
  }

  /**
   * Wrapper for single pipeline set.
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise<PluginStorageItem>}
   */
  set(key, value) {

    return this.pipeline().set(key, value).executeSingle();
  }

  /**
   * Wrapper for single pipeline setUnique.
   *
   * @param {string} key
   * @param {UniqueOptions} [options]
   * @returns {Promise<PluginStorageItem>}
   */
  setUnique(key, options = {}) {

    return this.pipeline().setUnique(key, options).executeSingle();
  }

  /**
   * Wrapper for single pipeline setUnique.
   *
   * @param {string} key
   * @param {UniqueNumOptions} [options]
   * @returns {Promise<PluginStorageItem>}
   */
  setUniqueNum(key, options = {}) {

    return this.pipeline().setUniqueNum(key, options).executeSingle();
  }

  /**
   * Wrapper for single pipeline unset.
   * Returns null if the item did not previously exist.
   *
   * @param {string} key
   * @returns {Promise<PluginStorageItem|null>}
   */
  unset(key) {

    return this.pipeline().unset(key).executeSingle();
  }

  /**
   * Wrapper for single pipeline update.
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise<PluginStorageItem>}
   */
  update(key, value) {

    return this.pipeline().update(key, value).executeSingle();
  }
}

module.exports = EnvoyPluginStorage;
