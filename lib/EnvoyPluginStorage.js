
class EnvoyPluginStorage {

  constructor(pluginAPI, installId = null) {

    this.api = pluginAPI;
    this.installId = installId;
  }

  /**
   * Executes multiple storage commands,
   * and returns an array of results (similar to Redis pipeline).
   *
   * @param {[]} commands
   * @returns {Promise<*>}
   */
  pipeline(commands) {

    return this.api.storagePipeline(commands, this.installId);
  }

  /**
   * Executes a single storage command.
   *
   * @param {{}} command
   * @returns {Promise<*>}
   */
  async execute(command) {

    const [item] = await this.pipeline([command]);
    return item;
  }

  /**
   * Gets a storage item.
   *
   * @param {string} key
   * @returns {Promise<*>}
   */
  get(key) {

    return this.execute({ action: 'get', key });
  }

  /**
   * Sets a value for a storage item,
   * and returns that item.
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise<*>}
   */
  set(key, value) {

    return this.execute({ action: 'set', key, value });
  }

  /**
   * Sets a unique value for a storage item,
   * and returns that item.
   *
   * @param {string} key
   * @param {{}} options
   * @returns {Promise<*>}
   */
  setUnique(key, options = {}) {

    return this.execute(Object.assign({ action: 'set_unique', key }, options));
  }

  /**
   * Unsets a storage item.
   *
   * @param {string} key
   * @returns {Promise<*>}
   */
  unset(key) {

    return this.execute({ action: 'unset', key });
  }
}

module.exports = EnvoyPluginStorage;
