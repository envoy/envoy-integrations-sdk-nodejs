import { Sync, each } from 'factory.ts';
import faker from 'faker';

import EntryPayload from '../payloads/EntryPayload';
import EnvoyEntryEvent from '../internal/EnvoyEntryEvent';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import eventBodyFactory from './eventBodyFactory';

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
  company: '1',
  flow: '1',
  invite: '1',
  device: '1',
  employee: '1',
};

export function entryPayloadFactory(options: EntryPayloadFactoryOptions, ids: Partial<typeof defaultIds> = defaultIds): Sync.Factory<EntryPayload> {
  const signedInDate = faker.date.past();
  const allIds = { ...defaultIds, ...ids };
  return Sync.makeFactory<EntryPayload>({
    id: each((i) => `${i}`),
    type: 'entries',
    attributes: {
      'full-name': faker.name.findName(),
      'phone-number': options.hasPhoneNumber ? faker.phone.phoneNumber() : undefined,
      email: (options.hasEmail || options.isProtectFlow) ? faker.internet.email() : null,
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
          id: allIds.location,
          type: 'locations',
        },
      },
      flow: {
        data: {
          id: allIds.flow,
          type: 'flows',
        },
      },
      invite: (options.isProtectFlow || options.nonProtectFlowOptions.hasInvite) ? {
        data: {
          id: allIds.invite,
          type: 'invites',
        },
      } : undefined,
      device: (!options.isProtectFlow && options.nonProtectFlowOptions.hasInvite) ? {
        data: {
          id: allIds.device,
          type: 'devices',
        },
      } : undefined,
      employee: (options.isProtectFlow || options.nonProtectFlowOptions.hasHost) ? {
        data: {
          id: allIds.employee,
          type: 'employees',
        },
      } : undefined,
    },
  });
}

export default function entryEventBodyFactory(
  options: {
    event: EnvoyEntryEvent,
    config: Record<string, unknown>,
    payloadOptions: EntryPayloadFactoryOptions,
    scope?: Array<EnvoyUserAPIScope>,
    ids?: Partial<typeof defaultIds>,
  },
) {
  const ids = options.ids || defaultIds;
  return eventBodyFactory<EnvoyEntryEvent, EntryPayload>({
    event: options.event,
    config: options.config,
    scope: options.scope || [],
    locationId: options.ids?.location || defaultIds.location,
    companyId: options.ids?.company || defaultIds.company,
    payload: entryPayloadFactory(options.payloadOptions, ids).build(),
  });
}
