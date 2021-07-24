import EnvoyPluginStoragePipeline from '../base/EnvoyPluginStoragePipeline';
import { EnvoyStorageSetUniqueNumOptions, EnvoyStorageSetUniqueOptions } from '../internal/EnvoyStorageCommand';
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
  protected readonly api: EnvoyPluginAPI;

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
   * Gets a single {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline get.
   */
  get<Value = unknown>(key: string): Promise<EnvoyStorageItem<Value> | null> {
    return this.pipeline().get(key).executeSingle() as Promise<EnvoyStorageItem<Value> | null>;
  }

  /**
   * Sets a single {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline set.
   */
  set<Value = unknown>(key: string, value: Value): Promise<EnvoyStorageItem<Value>> {
    return this.pipeline().set(key, value).executeSingle() as Promise<EnvoyStorageItem<Value>>;
  }

  /**
   * Sets a single unique string {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline setUnique.
   */
  setUnique(key: string, options: EnvoyStorageSetUniqueOptions = {}): Promise<EnvoyStorageItem<string> | null> {
    return this.pipeline().setUnique(key, options).executeSingle() as Promise<EnvoyStorageItem<string> | null>;
  }

  /**
   * Sets a single unique number {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline setUnique.
   */
  setUniqueNum(key: string, options: EnvoyStorageSetUniqueNumOptions = {}): Promise<EnvoyStorageItem<number> | null> {
    return this.pipeline().setUniqueNum(key, options).executeSingle() as Promise<EnvoyStorageItem<number> | null>;
  }

  /**
   * Unsets an {@link EnvoyStorageItem} from storage. Returns null if the item did not previously exist.
   *
   * Wrapper for single pipeline unset.
   */
  unset(key: string): Promise<EnvoyStorageItem | null> {
    return this.pipeline().unset(key).executeSingle();
  }
}
