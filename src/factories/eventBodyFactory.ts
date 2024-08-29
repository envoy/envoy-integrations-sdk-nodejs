import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import { eventMetaFactory } from './metaFactory';

export const eventBodyFactoryDefaultIds = {
  locationId: '1',
  companyId: '1',
  zoneId: '1',
};

export type EventBodyFactoryOptions<Event, Config, Payload> = {
  event: Event,
  config: Partial<Config>,
  payload: Payload,
  scope: Array<EnvoyUserAPIScope>,
  locationId?: string,
  companyId?: string,
  zoneId?: string,
};

export default function eventBodyFactory<
  Event extends string = string,
  Config extends Record<string, unknown> = Record<string, never>,
  Payload extends Record<string, unknown> = Record<string, never>,
  >(
  options: EventBodyFactoryOptions<Event, Config, Payload>,
) {
  return {
    meta: eventMetaFactory<Config>(
      options.event,
      options.config,
      options.scope,
      options.locationId || eventBodyFactoryDefaultIds.locationId,
      options.companyId || eventBodyFactoryDefaultIds.companyId,
      options.zoneId || eventBodyFactoryDefaultIds.zoneId,
    ).build(),
    payload: options.payload,
  };
}
