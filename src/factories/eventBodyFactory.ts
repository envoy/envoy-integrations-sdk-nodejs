import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import { eventMetaFactory } from './metaFactory';

export const defaultIds = {
  locationId: '1',
  companyId: '1',
};

export type EventBodyFactoryOptions<Event, Config, Payload> = {
  event: Event,
  config: Config,
  payload: Payload,
  scope: Array<EnvoyUserAPIScope>,
  locationId?: string,
  companyId?: string,
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
      options.locationId || defaultIds.locationId,
      options.companyId || defaultIds.companyId,
    ).build(),
    payload: options.payload,
  };
}
