import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import { routeMetaFactory } from './metaFactory';

export const routeBodyFactoryDefaultIds = {
  locationId: '1',
  companyId: '1',
  zoneId: '1',
};

export type RouteBodyFactoryOptions<Config, Params, Payload> = {
  config: Partial<Config>,
  params: Params,
  payload: Payload,
  scope?: Array<EnvoyUserAPIScope>,
  locationId?: string,
  companyId?: string,
  zoneId?: string,
  route?: string,
};

export default function routeBodyFactory<
  Config extends Record<string, unknown> = Record<string, never>,
  Params extends Record<string, unknown> = Record<string, never>,
  Payload extends Record<string, unknown> = Record<string, never>,
  >(
  options: RouteBodyFactoryOptions<Config, Params, Payload>,
) {
  return {
    meta: routeMetaFactory<Config, Params>(
      options.route || '',
      options.config,
      options.params,
      options.scope || [],
      options.locationId || routeBodyFactoryDefaultIds.locationId,
      options.companyId || routeBodyFactoryDefaultIds.companyId,
      options.zoneId || routeBodyFactoryDefaultIds.zoneId,
    ).build(),
    payload: options.payload,
  };
}
