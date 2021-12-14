import EnvoyPluginStoragePipeline from '../base/EnvoyPluginStoragePipeline';
import EnvoyStorageItem from '../sdk/EnvoyStorageItem';
import {
  EnvoyStorageSetUniqueNumOptions,
  EnvoyStorageSetUniqueOptions,
  UNIQUE_NUM_OPTIONS_DEFAULT_MAX,
  UNIQUE_NUM_OPTIONS_DEFAULT_MIN,
  UNIQUE_OPTIONS_DEFAULT_CHARS,
  UNIQUE_OPTIONS_DEFAULT_SIZE,
} from '../internal/EnvoyStorageCommand';
import EnvoyStorageResult from '../internal/EnvoyStorageResult';

const DEFAULT_UNIQUE_OPTIONS: EnvoyStorageSetUniqueOptions = {
  chars: UNIQUE_OPTIONS_DEFAULT_CHARS,
  size: UNIQUE_OPTIONS_DEFAULT_SIZE,
};

const DEFAULT_UNIQUE_NUM_OPTIONS: EnvoyStorageSetUniqueNumOptions = {
  min: UNIQUE_NUM_OPTIONS_DEFAULT_MIN,
  max: UNIQUE_NUM_OPTIONS_DEFAULT_MAX,
};

export default class EnvoyPluginStoragePipelineMock extends EnvoyPluginStoragePipeline {
  execute<Result extends EnvoyStorageResult = EnvoyStorageResult>(): Promise<Array<Result>> {
    return Promise.resolve(
      this.commands.map((command) => {
        const isGlobal = !this.installId;
        switch (command.action) {
          case 'get': {
            const value = EnvoyPluginStoragePipelineMock.get(command.key, isGlobal);
            if (value === null) {
              return null;
            }
            return EnvoyPluginStoragePipelineMock.itemFromKeyValue(command.key, value);
          }
          case 'set': {
            const value = EnvoyPluginStoragePipelineMock.set(command.key, command.value, isGlobal);
            return EnvoyPluginStoragePipelineMock.itemFromKeyValue(command.key, value);
          }
          case 'set_unique':
            try {
              const value = EnvoyPluginStoragePipelineMock.setUnique(command.key, command as EnvoyStorageSetUniqueOptions, isGlobal);
              return EnvoyPluginStoragePipelineMock.itemFromKeyValue(command.key, value);
            } catch (err) {
              return null;
            }
          case 'set_unique_num': {
            try {
              const value = EnvoyPluginStoragePipelineMock.setUniqueNum(command.key, command as EnvoyStorageSetUniqueNumOptions, isGlobal);
              return EnvoyPluginStoragePipelineMock.itemFromKeyValue(command.key, value);
            } catch (err) {
              return null;
            }
          }
          case 'unset': {
            const value = EnvoyPluginStoragePipelineMock.unset(command.key, isGlobal);
            if (value === null) {
              return null;
            }
            return EnvoyPluginStoragePipelineMock.itemFromKeyValue(command.key, value);
          }
          case 'list':
            return EnvoyPluginStoragePipelineMock.list(command.page);
          default:
            return null;
        }
      }) as Array<Result>,
    );
  }

  private static storage: Record<string, unknown> = {};

  private static uniqueStringKeys = new Set<string>();

  private static uniqueStringValues = new Set<string>();

  private static uniqueNumberKeys = new Set<string>();

  private static uniqueNumberValues = new Set<number>();

  private static normalizeKey(key: string, isGlobal: boolean) {
    return isGlobal ? `global_${key}` : `install_${key}`;
  }

  private static itemFromKeyValue<Value = unknown>(key: string, value: Value) {
    return { key, value } as EnvoyStorageItem<Value>;
  }

  static get<Value = unknown>(key: string, isGlobal = false): Value | null {
    key = EnvoyPluginStoragePipelineMock.normalizeKey(key, isGlobal);
    if (!Object.keys(EnvoyPluginStoragePipelineMock.storage).includes(key)) {
      return null;
    }
    return EnvoyPluginStoragePipelineMock.storage[key] as Value;
  }

  static set<Value = unknown>(key: string, value: Value, isGlobal = false) {
    key = EnvoyPluginStoragePipelineMock.normalizeKey(key, isGlobal);
    EnvoyPluginStoragePipelineMock.unset(key);
    EnvoyPluginStoragePipelineMock.storage[key] = value;
    return value;
  }

  static setUnique(key:string, options = DEFAULT_UNIQUE_OPTIONS, isGlobal = false) {
    key = EnvoyPluginStoragePipelineMock.normalizeKey(key, isGlobal);
    const chars = (options.chars && options.chars.length) ? options.chars : UNIQUE_OPTIONS_DEFAULT_CHARS;
    const size = options.size || UNIQUE_OPTIONS_DEFAULT_SIZE;
    if (!chars || !size) {
      throw new Error('Invalid "chars" or "size" arguments');
    }
    let value = EnvoyPluginStoragePipelineMock.makeUniqueString(chars, size);
    let numTries = 0;
    while (EnvoyPluginStoragePipelineMock.uniqueStringValues.has(value)) {
      value = EnvoyPluginStoragePipelineMock.makeUniqueString(chars, size);
      // eslint-disable-next-line no-plusplus
      if (++numTries > 1000) {
        throw new Error('Max tries reached');
      }
    }
    EnvoyPluginStoragePipelineMock.unset(key);
    EnvoyPluginStoragePipelineMock.uniqueStringValues.add(value);
    EnvoyPluginStoragePipelineMock.uniqueStringKeys.add(key);
    EnvoyPluginStoragePipelineMock.storage[key] = value;
    return value;
  }

  static setUniqueNum(key: string, options = DEFAULT_UNIQUE_NUM_OPTIONS, isGlobal = false) {
    key = EnvoyPluginStoragePipelineMock.normalizeKey(key, isGlobal);
    const min = options.min || UNIQUE_NUM_OPTIONS_DEFAULT_MIN;
    const max = options.max || UNIQUE_NUM_OPTIONS_DEFAULT_MAX;
    if (min >= max) {
      throw new Error('"min" must be lower than "max"');
    }
    let value = EnvoyPluginStoragePipelineMock.makeUniqueNumber(min, max);
    let numTries = 0;
    while (EnvoyPluginStoragePipelineMock.uniqueNumberValues.has(value)) {
      value = EnvoyPluginStoragePipelineMock.makeUniqueNumber(min, max);
      // eslint-disable-next-line no-plusplus
      if (++numTries > 1000) {
        throw new Error('Max tries reached');
      }
    }
    EnvoyPluginStoragePipelineMock.unset(key);
    EnvoyPluginStoragePipelineMock.uniqueNumberValues.add(value);
    EnvoyPluginStoragePipelineMock.uniqueNumberKeys.add(key);
    EnvoyPluginStoragePipelineMock.storage[key] = value;
    return value;
  }

  static unset<Value = unknown>(key: string, isGlobal = false) {
    key = EnvoyPluginStoragePipelineMock.normalizeKey(key, isGlobal);
    if (!Object.keys(EnvoyPluginStoragePipelineMock.storage).includes(key)) {
      return null;
    }
    const value = EnvoyPluginStoragePipelineMock.storage[key];
    if (EnvoyPluginStoragePipelineMock.uniqueStringKeys.has(key)) {
      EnvoyPluginStoragePipelineMock.uniqueStringValues.delete(value as string);
      EnvoyPluginStoragePipelineMock.uniqueStringKeys.delete(key);
    }
    if (EnvoyPluginStoragePipelineMock.uniqueNumberKeys.has(key)) {
      EnvoyPluginStoragePipelineMock.uniqueNumberValues.delete(value as number);
      EnvoyPluginStoragePipelineMock.uniqueNumberKeys.delete(key);
    }
    delete EnvoyPluginStoragePipelineMock.storage[key];
    return value as Value;
  }

  static list(page = 1, isGlobal = false) {
    const limit = 100;
    const offset = (page - 1) * limit;
    return Object.keys(EnvoyPluginStoragePipelineMock.storage)
      .filter((key) => (key.startsWith('global_') && isGlobal) || (key.startsWith('install_') && !isGlobal))
      .sort()
      .slice(offset, limit)
      .map((key) => {
        const value = EnvoyPluginStoragePipelineMock.storage[key];
        const pieces = key.split('_');
        pieces.shift();
        const normalizedKey = pieces.join();
        return { key: normalizedKey, value } as EnvoyStorageItem;
      });
  }

  static reset() {
    EnvoyPluginStoragePipelineMock.storage = {};
    EnvoyPluginStoragePipelineMock.uniqueStringKeys.clear();
    EnvoyPluginStoragePipelineMock.uniqueStringValues.clear();
    EnvoyPluginStoragePipelineMock.uniqueNumberKeys.clear();
    EnvoyPluginStoragePipelineMock.uniqueNumberValues.clear();
  }

  static makeUniqueString(chars: string, size: number) {
    let result = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < size; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static makeUniqueNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
