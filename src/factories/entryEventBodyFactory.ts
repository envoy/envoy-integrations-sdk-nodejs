import { Sync, each } from 'factory.ts';
import faker from 'faker';

import EntryPayload from '../payloads/EntryPayload';
import EnvoyEntryEvent from '../internal/EnvoyEntryEvent';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import eventBodyFactory from './eventBodyFactory';

export type EntryPayloadFactoryVisitorOptions = {
  isProtectFlow: false,
  isSignedIn: boolean,
  hasEmail: boolean,
  hasHost: boolean,
  hasInvite: boolean,
  hasDevice: boolean,
  hasPhoneNumber?: boolean,
  hasPhoto?: boolean,
};

export type EntryPayloadFactoryProtectOptions = {
  isProtectFlow: true,
  isSignedIn: boolean,
  hasPhoneNumber?: boolean,
  hasPhoto?: boolean,
};

export type EntryPayloadFactoryOptions = EntryPayloadFactoryVisitorOptions | EntryPayloadFactoryProtectOptions;

export const entryEventBodyFactoryDefaultIds = {
  location: '1',
  company: '1',
  flow: '1',
  invite: '1',
  device: '1',
  employee: '1',
};

export function entryPayloadFactory(
  options: EntryPayloadFactoryOptions,
  ids: Partial<typeof entryEventBodyFactoryDefaultIds> = entryEventBodyFactoryDefaultIds,
): Sync.Factory<EntryPayload> {
  const signedInDate = faker.date.past();
  const allIds = { ...entryEventBodyFactoryDefaultIds, ...ids };
  return Sync.makeFactory<EntryPayload>({
    id: each((i) => `${i + 1}`),
    type: 'entries',
    attributes: {
      'full-name': faker.name.findName(),
      'phone-number': options.hasPhoneNumber ? faker.phone.phoneNumber() : undefined,
      email: (options.isProtectFlow || options.hasEmail) ? faker.internet.email() : null,
      'employee-screening-flow': options.isProtectFlow,
      host: (!options.isProtectFlow && options.hasHost) ? faker.name.findName() : null,
      'host-email': (!options.isProtectFlow && options.hasHost) ? faker.internet.email() : null,
      'private-notes': null,
      'signed-in-at': signedInDate.toISOString(),
      'signed-out-at': options.isSignedIn ? undefined : faker.date.between(signedInDate, new Date()).toISOString(),
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
      invite: (options.isProtectFlow || options.hasInvite) ? {
        data: {
          id: allIds.invite,
          type: 'invites',
        },
      } : undefined,
      device: (!options.isProtectFlow && options.hasDevice) ? {
        data: {
          id: allIds.device,
          type: 'devices',
        },
      } : undefined,
      employee: (options.isProtectFlow || options.hasHost) ? {
        data: {
          id: allIds.employee,
          type: 'employees',
        },
      } : undefined,
    },
  });
}

export type EntryEventBodyFactoryOptions<Config extends Record<string, unknown> = Record<string, never>> = {
  event: EnvoyEntryEvent,
  config: Partial<Config>,
  payloadOptions: EntryPayloadFactoryOptions,
  scope?: Array<EnvoyUserAPIScope>,
  ids?: Partial<typeof entryEventBodyFactoryDefaultIds>,
};

export default function entryEventBodyFactory<Config extends Record<string, unknown> = Record<string, never>>(
  options: EntryEventBodyFactoryOptions<Config>,
) {
  const ids = options.ids || entryEventBodyFactoryDefaultIds;
  return eventBodyFactory<EnvoyEntryEvent, Config, EntryPayload>({
    event: options.event,
    config: options.config,
    scope: options.scope || [],
    locationId: options.ids?.location || entryEventBodyFactoryDefaultIds.location,
    companyId: options.ids?.company || entryEventBodyFactoryDefaultIds.company,
    payload: entryPayloadFactory(options.payloadOptions, ids).build(),
  });
}
