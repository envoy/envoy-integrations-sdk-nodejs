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

/**
 * @typedef {Object} UniqueOptions
 * @property {string} chars="0123456789" - the possible characters to pick from
 * @property {number} size=12 - the length of the value
 */

class EnvoyPluginStoragePipeline {

  /**
   *
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
    /**
     * @type {Command[]}
     */
    this.commands = [];
  }

  /**
   * Executes all the commands in the pipeline.
   *
   * @returns {Promise.<Array.<Command|null>>}
   */
  execute() {

    return this.api.storagePipeline(this.commands, this.installId);
  }

  /**
   * Executes the pipeline and returns the first result.
   *
   * @returns {Promise<PluginStorageItem>}
   */
  async executeSingle() {

    const [result] = await this.execute();
    return result;
  }

  /**
   *
   * @param {Command} command
   * @returns {EnvoyPluginStoragePipeline}
   */
  addCommand(command) {

    this.commands.push(command);
    return this;
  }

  /**
   * Gets a storage item.
   *
   * @param {string} key
   * @returns {EnvoyPluginStoragePipeline}
   */
  get(key) {

    return this.addCommand({ action: 'get', key });
  }

  /**
   * Sets a value for a storage item,
   * and returns that item.
   *
   * @param {string} key
   * @param value
   * @returns {EnvoyPluginStoragePipeline}
   */
  set(key, value) {

    return this.addCommand({ action: 'set', key, value });
  }

  /**
   * Sets a unique value for a storage item,
   * and returns that item.
   *
   * @param {string} key
   * @param {UniqueOptions} [options]
   * @returns {EnvoyPluginStoragePipeline}
   */
  setUnique(key, options = {}) {

    return this.addCommand(Object.assign({ action: 'set_unique', key }, options));
  }

  /**
   * Unsets a storage item.
   *
   * @param {string} key
   * @returns {EnvoyPluginStoragePipeline}
   */
  unset(key) {

    return this.addCommand({ action: 'unset', key });
  }
}

module.exports = EnvoyPluginStoragePipeline;
