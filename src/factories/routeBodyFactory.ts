import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import { routeMetaFactory } from './metaFactory';

export const defaultIds = {
  locationId: '1',
  companyId: '1',
};

export default function routeBodyFactory<Payload extends Record<string, unknown> = Record<string, never>>(
  options: {
    config: Record<string, unknown>,
    params: Record<string, unknown>,
    payload: Payload,
    scope?: Array<EnvoyUserAPIScope>,
    locationId?: string,
    companyId?: string,
    route?: string,
  },
) {
  return {
    meta: routeMetaFactory(
      options.route || '',
      options.config,
      options.params,
      options.scope || [],
      options.locationId || defaultIds.locationId,
      options.companyId || defaultIds.companyId,
    ).build(),
    payload: options.payload,
  };
}
