import EnvoyStorageItem from '../sdk/EnvoyStorageItem';

type EnvoyStorageResult<Value = unknown> = EnvoyStorageItem<Value> | Array<EnvoyStorageItem<Value>> | null;

export default EnvoyStorageResult;
