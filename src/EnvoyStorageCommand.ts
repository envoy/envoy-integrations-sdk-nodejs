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

type EnvoyStorageCommand = EnvoyGetStorageCommand
| EnvoySetStorageCommand
| EnvoySetUniqueStorageCommand
| EnvoySetUniqueNumStorageCommand
| EnvoyUnsetStorageCommand;

export default EnvoyStorageCommand;
