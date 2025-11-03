/**
 * Error message indicating missing data, used to detect missing storage items.
 * Added in https://github.com/envoy/envoy-integrations-sdk-nodejs/blob/v2.3.1/src/base/EnvoyAPI.ts#L79
 */
export const EMPTY_STORAGE_ERROR_MESSAGE = 'The data you are looking for may not exist';

export function ensureError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }

  let stringified = '[Unable to stringify the thrown value]';
  try {
    stringified = JSON.stringify(value);
  } catch {
    // ignore
  }

  const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`);
  return error;
}

/**
 * Check whether an error is due to an item not existing in Envoy.
 * Certain Envoy operations (notably storage ones) throw an error when an item does not exist, though
 * non-existence may be expected. Currently, the best way to identify this case is the error message.
 * @param error - The error to check.
 * @returns True if the error is likely due to a missing storage item, false otherwise.
 */
export function isEmptyStorageError(error: Error): boolean {
  if (error.message.includes(EMPTY_STORAGE_ERROR_MESSAGE)) {
    return true;
  }

  return false;
}
