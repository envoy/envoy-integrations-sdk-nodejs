import { Sync } from 'factory.ts';
import faker from 'faker';
import {
  EnvoyEventMeta,
  EnvoyMetaAuth,
  EnvoyMetaCompany,
  EnvoyMetaJob,
  EnvoyMetaLocation,
  EnvoyMetaZone,
  EnvoyRouteMeta,
} from '../sdk/EnvoyMeta';
import { EnvoyUserAPIScope } from '../sdk/EnvoyUserAPI';

export function jobFactory(name: string): Sync.Factory<EnvoyMetaJob> {
  return Sync.makeFactory<EnvoyMetaJob>({
    id: faker.datatype.uuid(),
    identifier: faker.datatype.string(),
    name,
  });
}

export function locationFactory(id: string): Sync.Factory<EnvoyMetaLocation> {
  const cityName = faker.address.cityName();
  const street = faker.address.streetAddress();
  return Sync.makeFactory<EnvoyMetaLocation>({
    id,
    type: 'locations',
    attributes: {
      name: cityName,
      'company-name-override': null,
      timezone: faker.address.timeZone(),
      locale: null,
      address: street,
      'address-line-one': street,
      'address-line-two': null,
      city: cityName,
      state: faker.address.stateAbbr(),
      country: faker.address.country(),
      zip: faker.address.zipCode(),
      longitude: null,
      latitude: null,
      'created-at': faker.date.past().toISOString(),
    },
  });
}

export function companyFactory(id: string): Sync.Factory<EnvoyMetaCompany> {
  return Sync.makeFactory<EnvoyMetaCompany>({
    id,
    type: 'companies',
    attributes: {
      name: faker.company.companyName(),
      active: true,
      'created-at': faker.date.past().toISOString(),
    },
  });
}

export function zoneFactory(id: string): Sync.Factory<EnvoyMetaZone> {
  const street = faker.address.streetAddress();
  return Sync.makeFactory<EnvoyMetaZone>({
    id,
    type: 'zones',
    attributes: {
      address: street,
      'logo-url': null,
      name: faker.company.companyName(),
      'time-zone': faker.address.timeZone(),
    },
  });
}

export function authFactory(): Sync.Factory<EnvoyMetaAuth> {
  return Sync.makeFactory<EnvoyMetaAuth>({
    token_type: 'Bearer',
    access_token: faker.random.alphaNumeric(),
    expires_in: faker.date.future().getSeconds(),
    refresh_token: null,
    refresh_token_expires_in: null,
  });
}

export function routeMetaFactory<
  Config extends Record<string, unknown> = Record<string, never>,
  Params extends Record<string, unknown> = Record<string, never>,
  >(
  route: string,
  config: Partial<Config>,
  params: Params,
  scope: Array<EnvoyUserAPIScope>,
  locationId: string,
  companyId: string,
  zoneId: string,
): Sync.Factory<EnvoyRouteMeta> {
  return Sync.makeFactory<EnvoyRouteMeta>({
    plugin_id: faker.datatype.uuid(),
    install_id: Math.ceil(Math.abs(faker.datatype.number())).toString(),
    location: locationFactory(locationId).build(),
    company: companyFactory(companyId).build(),
    zone: zoneFactory(zoneId).build(),
    auth: scope.length ? authFactory().build() : null,
    forwarded_bearer_token: faker.random.alphaNumeric(),
    route,
    config,
    params,
  });
}

export function eventMetaFactory<Config extends Record<string, unknown> = Record<string, never>>(
  event: string,
  config: Partial<Config>,
  scope: Array<EnvoyUserAPIScope>,
  locationId: string,
  companyId: string,
  zoneId: string,
): Sync.Factory<EnvoyEventMeta> {
  return Sync.makeFactory<EnvoyEventMeta>({
    plugin_id: faker.datatype.uuid(),
    install_id: Math.ceil(Math.abs(faker.datatype.number())).toString(),
    job: jobFactory(event).build(),
    location: locationFactory(locationId).build(),
    company: companyFactory(companyId).build(),
    zone: zoneFactory(zoneId).build(),
    auth: scope.length ? authFactory().build() : null,
    event,
    config,
  });
}
