import qs from 'qs';
import DataLoader from 'dataloader';
import JSONAPIData from '../util/json-api/JSONAPIData';
import { envoyBaseURL } from '../constants';
import { createAxiosClient } from '../util/axiosConstructor';
import { EMPTY_STORAGE_ERROR_MESSAGE } from '../util/errorHandling';
import { buildUserAgent, buildClientInfoHeader } from '../util/userAgent';

interface EnvoyWebDataLoaderKey extends JSONAPIData {
  include?: string;
}

/**
 * Options for configuring EnvoyAPI client
 */
export interface EnvoyAPIOptions {
  /** Access token for authentication */
  accessToken: string;
  /**
   * Custom application identifier appended to User-Agent header.
   * Format: "AppName/Version"
   * Example: "MyCompanyApp/1.0.0"
   *
   * This identifier helps track API usage by application and aids in debugging.
   */
  userAgent?: string;
}

/**
 * Sometimes envoy-web will give us back some relationship data
 * with the "type" set to the relationships name instead of the actual model's name.
 * This mapping allows us to alias those cases.
 */
const TYPE_ALIASES = new Map<string, string>([['employee-screening-flows', 'flows']]);

/**
 * Make typed API calls to Envoy.
 * Uses a data loader to leverage JSONAPI's "include" functionality.
 * This allows us to save everything that was included in the initial response
 * to be used later without re-fetching from the API.
 *
 * @category Base
 */
export default class EnvoyAPI {
  /**
   * HTTP Client with Envoy's defaults.
   * User-Agent headers are set in the constructor after client instantiation.
   */
  readonly axios = createAxiosClient({
    baseURL: envoyBaseURL,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
    paramsSerializer: (params) =>
      qs.stringify(params, {
        arrayFormat: 'brackets',
        encode: false,
      }),
  });

  /**
   * A dataloader: https://github.com/graphql/dataloader
   * Will fetch individual resources from the API,
   * unless they exist in cache (which they usually will).
   */
  protected readonly dataLoader = new DataLoader<EnvoyWebDataLoaderKey, any, string>(
    (keys) =>
      Promise.all(
        keys.map(async ({ type, id, include }) => {
          const { data } = await this.axios.get(`api/v3/${type}/${id}`, { params: { include } });
          return data.data;
        }),
      ),
    {
      cacheKeyFn: (key) => `${key.type}_${key.id}`,
    },
  );

  /**
   * Create an EnvoyAPI client instance
   *
   * @param options - Either an access token string (for backward compatibility)
   *                  or an EnvoyAPIOptions object with accessToken and optional userAgent
   *
   * @example
   * // Legacy usage (still supported)
   * const client = new EnvoyAPI('access-token-here');
   *
   * @example
   * // New usage with custom User-Agent
   * const client = new EnvoyAPI({
   *   accessToken: 'access-token-here',
   *   userAgent: 'MyApp/1.0.0'
   * });
   */
  constructor(options: EnvoyAPIOptions | string) {
    // Support both string (legacy) and options object (new)
    const { accessToken, userAgent } = typeof options === 'string'
      ? { accessToken: options, userAgent: undefined }
      : options;

    // Set authorization header (critical - must succeed)
    this.axios.defaults.headers.authorization = `Bearer ${accessToken}`;

    // Set User-Agent headers with absolute guarantee that failures won't break SDK
    // GUARANTEE: This block will NEVER throw an exception, no matter what happens
    // User-Agent headers are telemetry/debugging aids, not critical for SDK functionality
    try {
      // Primary attempt: Use full header generation functions
      this.axios.defaults.headers['User-Agent'] = buildUserAgent(userAgent);
      this.axios.defaults.headers['X-Envoy-Client-Info'] = buildClientInfoHeader(userAgent);
    } catch (error) {
      // Secondary fallback: Set minimal valid headers
      try {
        this.axios.defaults.headers['User-Agent'] = 'envoy-integrations-sdk/unknown';
        this.axios.defaults.headers['X-Envoy-Client-Info'] = '{"sdk":"envoy-integrations-sdk"}';
      } catch (fallbackError) {
        // Tertiary fallback: Even setting minimal headers failed
        // Continue without User-Agent headers - SDK remains fully functional
        // This catch ensures absolute guarantee that SDK initialization succeeds
      }
    }

    /**
     * Saves every model that was "include"ed in the response,
     * which saves us the trouble of fetching related data.
     */
    this.axios.interceptors.response.use(
      (response) => {
        const {
          data: { data: modelOrModels, included },
        } = response;

        (included || []).concat(modelOrModels).forEach((model: JSONAPIData) => {
          if (!model) {
            throw new Error(EMPTY_STORAGE_ERROR_MESSAGE);
          }
          this.dataLoader.prime({ type: model.type, id: model.id }, model);
          const alias = TYPE_ALIASES.get(model.type);
          if (alias) {
            this.dataLoader.prime({ type: alias, id: model.id }, model);
          }
        });
        return response;
      },
      (error) => Promise.reject(error),
    );
  }
}
