export const UNIQUE_OPTIONS_DEFAULT_CHARS = '0123456789';

export const UNIQUE_OPTIONS_DEFAULT_SIZE = 12;

export const UNIQUE_NUM_OPTIONS_DEFAULT_MIN = 0;

export const UNIQUE_NUM_OPTIONS_DEFAULT_MAX = 9_007_199_254_740_991;

export interface EnvoyStorageSetUniqueOptions {
  chars?: string,
  size?: number,
}

export interface EnvoyStorageSetUniqueNumOptions {
  min?: number,
  max?: number,
}

export interface EnvoyBaseStorageCommand {
  action: 'get' | 'set' | 'set_unique' | 'set_unique_num' | 'unset',
  key: string,
}

export interface EnvoyGetStorageCommand extends EnvoyBaseStorageCommand {
  action: 'get',
}

export interface EnvoySetStorageCommand extends EnvoyBaseStorageCommand {
  action: 'set',
  value: unknown,
}

export interface EnvoySetUniqueStorageCommand extends EnvoyBaseStorageCommand, EnvoyStorageSetUniqueOptions {
  action: 'set_unique',
}

export interface EnvoySetUniqueNumStorageCommand extends EnvoyBaseStorageCommand, EnvoyStorageSetUniqueNumOptions {
  action: 'set_unique_num',
}

export interface EnvoyUnsetStorageCommand extends EnvoyBaseStorageCommand {
  action: 'unset',
}

export interface EnvoyListStorageCommand {
  action: 'list',
  page: number,
}

/**
 * @internal
 */
type EnvoyStorageCommand = EnvoyGetStorageCommand
| EnvoySetStorageCommand
| EnvoySetUniqueStorageCommand
| EnvoySetUniqueNumStorageCommand
| EnvoyUnsetStorageCommand
| EnvoyListStorageCommand;

export default EnvoyStorageCommand;
