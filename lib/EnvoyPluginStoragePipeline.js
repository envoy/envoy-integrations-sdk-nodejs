class EnvoyPluginStoragePipeline {

  constructor(pluginAPI, installId = null) {

    this.api = pluginAPI;
    this.installId = installId;
    this.commands = [];
  }

  /**
   * Executes all the commands in the pipeline.
   *
   * @returns {Promise<[]>}
   */
  execute() {

    return this.api.storagePipeline(this.commands, this.installId);
  }

  /**
   * Executes the pipeline and returns the first result.
   *
   * @returns {Promise<*>}
   */
  async executeSingle() {

    const [result] = await this.execute();
    return result;
  }

  /**
   *
   * @param {{}} command
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
   * @param {*} value
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
   * @param {{}} options
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
