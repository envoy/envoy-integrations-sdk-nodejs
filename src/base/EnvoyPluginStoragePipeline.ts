import EnvoyStorageCommand, {
  EnvoyStorageSetUniqueNumOptions,
  EnvoyStorageSetUniqueOptions,
} from '../internal/EnvoyStorageCommand';
import EnvoyStorageItem from '../sdk/EnvoyStorageItem';
import EnvoyPluginAPI from '../sdk/EnvoyPluginAPI';

/**
 * Builds up a request pipeline for submitting storage commands.
 *
 * @category Base
 */
export default class EnvoyPluginStoragePipeline {
  protected readonly api: EnvoyPluginAPI;

  readonly installId: string | undefined;

  protected readonly commands: Array<EnvoyStorageCommand>;

  constructor(pluginAPI: EnvoyPluginAPI, installId?: string) {
    this.api = pluginAPI;
    this.installId = installId;
    this.commands = [];
  }

  /**
   * Executes all the commands in the pipeline.
   */
  execute(): Promise<Array<EnvoyStorageItem | null>> {
    return this.api.storagePipeline(this.commands, this.installId);
  }

  /**
   * Executes the pipeline and returns the first result.
   */
  async executeSingle(): Promise<EnvoyStorageItem | null> {
    const [result] = await this.execute();
    return result;
  }

  addCommand(command: EnvoyStorageCommand): EnvoyPluginStoragePipeline {
    this.commands.push(command);
    return this;
  }

  /**
   * Gets a storage item.
   */
  get(key: string): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'get', key });
  }

  /**
   * Sets a value for a storage item,
   * and returns that item.
   */
  set(key: string, value: unknown): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'set', key, value });
  }

  /**
   * Sets a unique value for a storage item,
   * and returns that item.
   */
  setUnique(key: string, options: EnvoyStorageSetUniqueOptions = {}): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'set_unique', key, ...options });
  }

  /**
   * Sets a unique number value for a storage item,
   * and returns that item.
   */
  setUniqueNum(key: string, options: EnvoyStorageSetUniqueNumOptions = {}): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'set_unique_num', key, ...options });
  }

  /**
   * Unsets a storage item.
   */
  unset(key: string): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'unset', key });
  }
}
