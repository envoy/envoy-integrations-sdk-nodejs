import EnvoyPluginStoragePipeline from './EnvoyPluginStoragePipeline';
import EnvoyAPI from './EnvoyAPI';
import { EnvoyStorageSetUniqueNumOptions, EnvoyStorageSetUniqueOptions } from './EnvoyStorageCommand';
import EnvoyStorageItem from './EnvoyStorageItem';

export default class EnvoyPluginStorage {
  readonly api: EnvoyAPI;

  readonly installId: string | undefined;

  constructor(pluginAPI: EnvoyAPI, installId?: string) {
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
  set(key: string, value: any): Promise<EnvoyStorageItem | null> {
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
