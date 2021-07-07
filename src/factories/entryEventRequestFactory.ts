import { Sync, each } from 'factory.ts';
import faker from 'faker';

import EntryPayload from '../payloads/EntryPayload';
import EnvoyEntryEvent from '../internal/EnvoyEntryEvent';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import EnvoyRequest, { EnvoyEntryEventRequest } from '../sdk/EnvoyRequest';
import eventRequestFactory from './eventRequestFactory';

export type EntryPayloadFactoryOptions = {
  isSignedIn: boolean,
  hasEmail: boolean,
  hasPhoneNumber: boolean,
  hasPhoto: boolean,
  isProtectFlow: boolean,
  nonProtectFlowOptions: {
    hasHost: boolean,
    hasInvite: boolean,
    hasDevice: boolean,
  }
};

export const defaultIds = {
  location: '1',
  flow: '1',
  invite: '1',
  device: '1',
};

export function entryPayloadFactory(options: EntryPayloadFactoryOptions, ids = defaultIds): Sync.Factory<EntryPayload> {
  const signedInDate = faker.date.past();
  return Sync.makeFactory<EntryPayload>({
    id: each((i) => `${i}`),
    type: 'entries',
    attributes: {
      'full-name': faker.name.findName(),
      'phone-number': options.hasPhoneNumber ? faker.phone.phoneNumber() : undefined,
      email: options.hasEmail ? faker.internet.email() : null,
      'employee-screening-flow': options.isProtectFlow,
      host: (!options.isProtectFlow && options.nonProtectFlowOptions.hasHost) ? faker.name.findName() : null,
      'host-email': (!options.isProtectFlow && options.nonProtectFlowOptions.hasHost) ? faker.internet.email() : null,
      'private-notes': null,
      'signed-in-at': signedInDate.toUTCString(),
      'signed-out-at': options.isSignedIn ? undefined : faker.date.between(signedInDate, new Date()).toUTCString(),
      thumbnails: options.hasPhoto ? {
        large: faker.image.avatar(),
        original: faker.image.avatar(),
        small: faker.image.avatar(),
      } : {
        large: null,
        original: null,
        small: null,
      },
      'flow-name': options.isProtectFlow ? 'Employee registration' : 'Visitor',
      'user-data': [] as Array<{ field: string, value: string | null }>,
    },
    relationships: {
      location: {
        data: {
          id: ids.location,
          type: 'locations',
        },
      },
      flow: {
        data: {
          id: ids.flow,
          type: 'flows',
        },
      },
      invite: (options.isProtectFlow || options.nonProtectFlowOptions.hasInvite) ? {
        data: {
          id: ids.invite,
          type: 'invites',
        },
      } : undefined,
      device: (!options.isProtectFlow && options.nonProtectFlowOptions.hasInvite) ? {
        data: {
          id: ids.device,
          type: 'devices',
        },
      } : undefined,
    },
  });
}

export default function entryEventRequestFactory(
  req: EnvoyRequest,
  options: {
    event: EnvoyEntryEvent,
    config: Record<string, unknown>,
    scope: Array<EnvoyUserAPIScope>,
    payloadOptions: EntryPayloadFactoryOptions,
    ids?: typeof defaultIds,
    isVerified?: boolean,
    pluginAccessToken?: string,
  },
): EnvoyEntryEventRequest {
  const ids = options.ids || defaultIds;
  return eventRequestFactory<EnvoyEntryEvent, EntryPayload>(req, {
    event: options.event,
    config: options.config,
    scope: options.scope,
    locationId: ids.location,
    isVerified: options.isVerified,
    pluginAccessToken: options.pluginAccessToken,
    payload: entryPayloadFactory(options.payloadOptions, ids).build(),
  }) as EnvoyEntryEventRequest;
}
