import EnvoyStorageCommand, {
  EnvoyStorageSetUniqueNumOptions,
  EnvoyStorageSetUniqueOptions,
} from '../internal/EnvoyStorageCommand';
import EnvoyStorageResult from '../internal/EnvoyStorageResult';
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
  execute<Result extends EnvoyStorageResult = EnvoyStorageResult>(): Promise<Array<Result>> {
    return this.api.storagePipeline<Result>(this.commands, this.installId);
  }

  /**
   * Executes the pipeline and returns the first result.
   */
  async executeSingle<Result extends EnvoyStorageResult = EnvoyStorageResult>(): Promise<Result> {
    const [result] = await this.execute<Result>();
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
    if (options.min) {
      options.min = Number(options.min);
    }
    if (options.max) {
      options.max = Number(options.max);
    }
    return this.addCommand({ action: 'set_unique_num', key, ...options });
  }

  /**
   * Unsets a storage item.
   */
  unset(key: string): EnvoyPluginStoragePipeline {
    return this.addCommand({ action: 'unset', key });
  }

  /**
   * Lists storage items.
   */
  list(page = 1): EnvoyPluginStoragePipeline {
    if (!page) {
      page = 1;
    }
    return this.addCommand({ action: 'list', page });
  }
}
