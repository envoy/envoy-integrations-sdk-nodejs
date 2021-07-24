import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import { eventMetaFactory } from './metaFactory';

export const defaultIds = {
  locationId: '1',
  companyId: '1',
};

export default function eventBodyFactory<
  Event extends string = string,
  Payload extends Record<string, unknown> = Record<string, never>,
  >(
  options: {
    event: Event,
    config: Record<string, unknown>,
    payload: Payload,
    scope: Array<EnvoyUserAPIScope>,
    locationId?: string,
    companyId?: string,
  },
) {
  return {
    meta: eventMetaFactory(
      options.event,
      options.config,
      options.scope,
      options.locationId || defaultIds.locationId,
      options.companyId || defaultIds.companyId,
    ).build(),
    payload: options.payload,
  };
}
