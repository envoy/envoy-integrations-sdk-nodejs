import { SplitFactory } from '@splitsoftware/splitio';

const { SPLIT_API_KEY = 'localhost', SPLIT_PROXY_URL } = process.env;

export { SPLIT_API_KEY, SPLIT_PROXY_URL };

const SPLIT_RETRIES_ON_FAILURE = 10;
const SPLIT_STARTUP_TIMEOUT_IN_SECONDS = 30;

/**
 * Creates a Split.io client for feature flag evaluation
 */
export function createSplitClient(apiKey: string, proxyUrl?: string) {
  const splitConfig: SplitIO.INodeSettings = {
    core: {
      authorizationKey: apiKey,
    },
    startup: {
      retriesOnFailureBeforeReady: SPLIT_RETRIES_ON_FAILURE,
      readyTimeout: SPLIT_STARTUP_TIMEOUT_IN_SECONDS,
    },
    debug: false,
    streamingEnabled: false,
  };

  if (proxyUrl) {
    splitConfig.urls = {
      sdk: proxyUrl,
      events: proxyUrl,
      auth: proxyUrl,
      streaming: proxyUrl,
      telemetry: proxyUrl,
    };
  }

  const factory = SplitFactory(splitConfig);
  return factory.client();
}

/**
 * Singleton Split.io client instance
 */
export const splitClient = createSplitClient(SPLIT_API_KEY, SPLIT_PROXY_URL);
