import qs from 'qs';
import DataLoader from 'dataloader';
import JSONAPIData from '../util/json-api/JSONAPIData';
import { envoyBaseURL } from '../constants';
import { createAxiosClient } from '../util/axiosConstructor';

interface EnvoyWebDataLoaderKey extends JSONAPIData {
  include?: string;
}

/**
 * Sometimes envoy-web will give us back some relationship data
 * with the "type" set to the relationships name instead of the actual model's name.
 * This mapping allows us to alias those cases.
 */
const TYPE_ALIASES = new Map<string, string>([
  ['employee-screening-flows', 'flows'],
]);

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
   */
  readonly axios = createAxiosClient({
    baseURL: envoyBaseURL,
    headers: {
      'Content-Type': 'application/vnd.api+json',
      Accept: 'application/vnd.api+json',
    },
    paramsSerializer: (params) => qs.stringify(params, {
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
    (keys) => Promise.all(
      keys.map(async ({ type, id, include }) => {
        const { data } = await this.axios.get(`api/v3/${type}/${id}`, { params: { include } });
        return data.data;
      }),
    ),
    {
      cacheKeyFn: (key) => `${key.type}_${key.id}`,
    },
  );

  constructor(accessToken: string) {
    this.axios.defaults.headers.authorization = `Bearer ${accessToken}`;
    /**
     * Saves every model that was "include"ed in the response,
     * which saves us the trouble of fetching related data.
     */
    this.axios.interceptors.response.use((response) => {
      const {
        data: {
          data: modelOrModels,
          included,
        },
      } = response;

      (included || [])
        .concat(modelOrModels)
        .forEach((model: JSONAPIData) => {
          this.dataLoader.prime({ type: model.type, id: model.id }, model);
          const alias = TYPE_ALIASES.get(model.type);
          if (alias) {
            this.dataLoader.prime({ type: alias, id: model.id }, model);
          }
        });
      return response;
    }, (error) => Promise.reject(error));
  }
}
