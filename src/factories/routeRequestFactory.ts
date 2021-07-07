import faker from 'faker';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import EnvoyRequest from '../sdk/EnvoyRequest';
import { routeMetaFactory } from './metaFactory';
import EnvoyPluginSDK from '../sdk/EnvoyPluginSDK';
import { EnvoyRouteMeta } from '../sdk/EnvoyMeta';

export default function routeRequestFactory<Payload extends Record<string, unknown> = Record<string, never>>(
  req: EnvoyRequest,
  options: {
    route: string,
    config: Record<string, unknown>,
    params: Record<string, unknown>,
    payload: Payload,
    scope: Array<EnvoyUserAPIScope>,
    locationId: string,
    isVerified?: boolean,
    pluginAccessToken?: string,
  },
): EnvoyRequest {
  const body = {
    meta: routeMetaFactory(
      options.route,
      options.config,
      options.params,
      options.scope,
      options.locationId,
    ).build(),
    payload: options.payload,
  };
  const isVerified = options.isVerified === undefined ? true : options.isVerified;
  const pluginAccessToken = options.pluginAccessToken === undefined ? faker.random.word() : options.pluginAccessToken;
  req.envoy = new EnvoyPluginSDK<EnvoyRouteMeta, Payload>(body, isVerified, pluginAccessToken);
  return req;
}
