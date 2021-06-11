import EnvoyPluginStoragePipeline from './EnvoyPluginStoragePipeline';
import { EnvoyStorageSetUniqueNumOptions, EnvoyStorageSetUniqueOptions } from './EnvoyStorageCommand';
import EnvoyStorageItem from './EnvoyStorageItem';
import EnvoyPluginAPI from './EnvoyPluginAPI';

/**
 * A key-value storage that can be scoped to a specific install,
 * or to the plugin itself.
 *
 * @category Storage
 * @category Request Object
 */
export default class EnvoyPluginStorage {
  readonly api: EnvoyPluginAPI;

  readonly installId: string | undefined;

  constructor(pluginAPI: EnvoyPluginAPI, installId?: string) {
    this.api = pluginAPI;
    this.installId = installId;
  }

  /**
   * Creates a new pipeline instance.
   */
  pipeline(): EnvoyPluginStoragePipeline {
    return new EnvoyPluginStoragePipeline(this.api, this.installId);
  }

  /**
   * Wrapper for single pipeline get.
   */
  get(key: string): Promise<EnvoyStorageItem | null> {
    return this.pipeline().get(key).executeSingle();
  }

  /**
   * Wrapper for single pipeline set.
   */
  set(key: string, value: unknown): Promise<EnvoyStorageItem | null> {
    return this.pipeline().set(key, value).executeSingle();
  }

  /**
   * Wrapper for single pipeline setUnique.
   */
  setUnique(key: string, options: EnvoyStorageSetUniqueOptions = {}): Promise<EnvoyStorageItem | null> {
    return this.pipeline().setUnique(key, options).executeSingle();
  }

  /**
   * Wrapper for single pipeline setUnique.
   */
  setUniqueNum(key: string, options: EnvoyStorageSetUniqueNumOptions = {}): Promise<EnvoyStorageItem | null> {
    return this.pipeline().setUniqueNum(key, options).executeSingle();
  }

  /**
   * Wrapper for single pipeline unset.
   * Returns null if the item did not previously exist.
   */
  unset(key: string): Promise<EnvoyStorageItem | null> {
    return this.pipeline().unset(key).executeSingle();
  }
}
