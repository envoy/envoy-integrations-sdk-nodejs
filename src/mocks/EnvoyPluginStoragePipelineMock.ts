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

const DEFAULT_UNIQUE_OPTIONS: EnvoyStorageSetUniqueOptions = {
  chars: UNIQUE_OPTIONS_DEFAULT_CHARS,
  size: UNIQUE_OPTIONS_DEFAULT_SIZE,
};

const DEFAULT_UNIQUE_NUM_OPTIONS: EnvoyStorageSetUniqueNumOptions = {
  min: UNIQUE_NUM_OPTIONS_DEFAULT_MIN,
  max: UNIQUE_NUM_OPTIONS_DEFAULT_MAX,
};

export default class EnvoyPluginStoragePipelineMock extends EnvoyPluginStoragePipeline {
  execute(): Promise<Array<EnvoyStorageItem | null>> {
    return Promise.resolve(
      this.commands.map((command) => {
        const { key } = command;
        const item: EnvoyStorageItem<undefined | unknown> = { key, value: undefined };
        const isGlobal = !this.installId;
        switch (command.action) {
          case 'get':
            item.value = EnvoyPluginStoragePipelineMock.get(key, isGlobal);
            if (item.value === null) {
              return null;
            }
            break;
          case 'set':
            item.value = EnvoyPluginStoragePipelineMock.set(key, command.value, isGlobal);
            break;
          case 'set_unique':
            try {
              item.value = EnvoyPluginStoragePipelineMock.setUnique(key, command as EnvoyStorageSetUniqueOptions, isGlobal);
            } catch (err) {
              return null;
            }
            break;
          case 'set_unique_num': {
            try {
              item.value = EnvoyPluginStoragePipelineMock.setUniqueNum(key, command as EnvoyStorageSetUniqueNumOptions, isGlobal);
            } catch (err) {
              return null;
            }
            break;
          }
          case 'unset':
            item.value = EnvoyPluginStoragePipelineMock.unset(key, isGlobal);
            if (item.value === null) {
              return null;
            }
            break;
          default:
            return null;
        }
        return item;
      }),
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
