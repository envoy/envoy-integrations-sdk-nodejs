import { Sync, each } from 'factory.ts';
import faker from 'faker';

import InvitePayload from '../payloads/InvitePayload';
import EnvoyInviteEvent from '../internal/EnvoyInviteEvent';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';
import eventBodyFactory from './eventBodyFactory';

export type InvitePayloadFactoryVisitorOptions = {
  isProtectFlow: false,
  hasEmail: boolean,
  hasHost: boolean,
  preregistrationComplete: boolean,
  hasPhoto?: boolean,
};

export type InvitePayloadFactoryProtectOptions = {
  isProtectFlow: true,
  preregistrationComplete: boolean,
  hasPhoto?: boolean,
};

export type InvitePayloadFactoryOptions = InvitePayloadFactoryVisitorOptions | InvitePayloadFactoryProtectOptions;

export const inviteEventBodyFactoryDefaultIds = {
  location: '1',
  company: '1',
  flow: '1',
  invite: '1',
  device: '1',
  employee: '1',
};

export function invitePayloadFactory(
  options: InvitePayloadFactoryOptions,
  ids: Partial<typeof inviteEventBodyFactoryDefaultIds> = inviteEventBodyFactoryDefaultIds,
): Sync.Factory<InvitePayload> {
  const signedInDate = faker.date.past();
  const allIds = { ...inviteEventBodyFactoryDefaultIds, ...ids };
  return Sync.makeFactory<InvitePayload>({
    id: each((i) => `${i + 1}`),
    type: 'invites',
    attributes: {
      'employee-screening-flow': options.isProtectFlow,
      'full-name': faker.name.findName(),
      email: (options.isProtectFlow || options.hasEmail) ? faker.internet.email() : null,
      'inviter-name': (!options.isProtectFlow && options.hasHost) ? faker.name.findName() : null,
      'inviter-email': (!options.isProtectFlow && options.hasHost) ? faker.internet.email() : null,
      'expected-arrival-time': faker.date.future().toISOString(),
      'private-notes': null,
      arrived: false,
      'been-here-before': false,
      'flow-name': options.isProtectFlow ? 'Employee registration' : 'Visitor',
      'flow-id': allIds.flow,
      'user-data': [] as Array<{ field: string, value: string | null }>,
      'secret-token': faker.random.alphaNumeric(10),
      'edit-token': faker.random.alphaNumeric(10),
      'photo-url': faker.image.avatar(),
      'qr-code': null,
      'qr-code-sent-at': null,
      'preregistration-complete': options.preregistrationComplete,
      'reminder-sent-at': null,
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
      employee: (options.isProtectFlow || options.hasHost) ? {
        data: {
          id: allIds.employee,
          type: 'employees',
        },
      } : undefined,
    },
  });
}

export type InviteEventBodyFactoryOptions<Config extends Record<string, unknown> = Record<string, never>> = {
  event: EnvoyInviteEvent,
  config: Partial<Config>,
  payloadOptions: InvitePayloadFactoryOptions,
  scope?: Array<EnvoyUserAPIScope>,
  ids?: Partial<typeof inviteEventBodyFactoryDefaultIds>,
};

export default function entryEventBodyFactory<Config extends Record<string, unknown> = Record<string, never>>(
  options: InviteEventBodyFactoryOptions<Config>,
) {
  const ids = options.ids || inviteEventBodyFactoryDefaultIds;
  return eventBodyFactory<EnvoyInviteEvent, Config, InvitePayload>({
    event: options.event,
    config: options.config,
    scope: options.scope || [],
    locationId: options.ids?.location || inviteEventBodyFactoryDefaultIds.location,
    companyId: options.ids?.company || inviteEventBodyFactoryDefaultIds.company,
    payload: invitePayloadFactory(options.payloadOptions, ids).build(),
  });
}
