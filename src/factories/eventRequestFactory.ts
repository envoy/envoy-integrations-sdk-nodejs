import faker from 'faker';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import EnvoyRequest from '../sdk/EnvoyRequest';
import { eventMetaFactory } from './metaFactory';
import EnvoyPluginSDK from '../sdk/EnvoyPluginSDK';
import { EnvoyEventMeta } from '../sdk/EnvoyMeta';

export default function eventRequestFactory<
  Event extends string = string,
  Payload extends Record<string, unknown> = Record<string, never>,
  >(
  req: EnvoyRequest,
  options: {
    event: Event,
    config: Record<string, unknown>,
    payload: Payload,
    scope: Array<EnvoyUserAPIScope>,
    locationId: string,
    isVerified?: boolean,
    pluginAccessToken?: string,
  },
): EnvoyRequest {
  const body = {
    meta: eventMetaFactory(
      options.event,
      options.config,
      options.scope,
      options.locationId,
    ).build(),
    payload: options.payload,
  };
  const isVerified = options.isVerified === undefined ? true : options.isVerified;
  const pluginAccessToken = options.pluginAccessToken === undefined ? faker.random.word() : options.pluginAccessToken;
  req.envoy = new EnvoyPluginSDK<EnvoyEventMeta, Payload>(body, isVerified, pluginAccessToken);
  return req;
}
