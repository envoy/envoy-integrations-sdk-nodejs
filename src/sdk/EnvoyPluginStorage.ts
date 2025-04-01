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
  get<Value = unknown>(key: string) {
    return this.pipeline().get(key).executeSingle<EnvoyStorageItem<Value> | { key: string, 'value': undefined }>();
  }

  /**
   * Sets a single {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline set.
   */
  set<Value = unknown>(key: string, value: Value) {
    return this.pipeline().set(key, value).executeSingle<EnvoyStorageItem<Value>>();
  }

  /**
   * Sets a single unique string {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline setUnique.
   */
  setUnique(key: string, options: EnvoyStorageSetUniqueOptions = {}) {
    return this.pipeline().setUnique(key, options).executeSingle<EnvoyStorageItem<string> | { key: string, 'value': undefined }>();
  }

  /**
   * Sets a single unique number {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline setUnique.
   */
  setUniqueNum(key: string, options: EnvoyStorageSetUniqueNumOptions = {}) {
    return this.pipeline().setUniqueNum(key, options).executeSingle<EnvoyStorageItem<number> | { key: string, 'value': undefined }>();
  }

  /**
   * Unsets an {@link EnvoyStorageItem} from storage. Returns null if the item did not previously exist.
   *
   * Wrapper for single pipeline unset.
   */
  unset<Value = unknown>(key: string) {
    return this.pipeline().unset(key).executeSingle<EnvoyStorageItem<Value> | { key: string, 'value': undefined }>();
  }

  /**
   * Returns an array of {@link EnvoyStorageItem} from storage.
   *
   * Wrapper for single pipeline list.
   */
  list<Value = unknown>(page = 1) {
    return this.pipeline().list(page).executeSingle<Array<EnvoyStorageItem<Value>>>();
  }
}
