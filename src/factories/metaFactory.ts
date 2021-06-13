import { Sync } from 'factory.ts';
import faker from 'faker';
import {
  EnvoyEventMeta, EnvoyMetaAuth, EnvoyMetaCompany, EnvoyMetaJob, EnvoyMetaLocation, EnvoyRouteMeta,
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
      'created-at': faker.date.past().toUTCString(),
    },
  });
}

export function companyFactory(): Sync.Factory<EnvoyMetaCompany> {
  return Sync.makeFactory<EnvoyMetaCompany>({
    id: faker.datatype.number().toString(),
    type: 'companies',
    attributes: {
      name: faker.company.companyName(),
      active: true,
      'created-at': faker.date.past().toUTCString(),
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

export function routeMetaFactory(
  route: string,
  config: Record<string, unknown>,
  params: Record<string, unknown>,
  scope: Array<EnvoyUserAPIScope>,
  locationId: string,
): Sync.Factory<EnvoyRouteMeta> {
  return Sync.makeFactory<EnvoyRouteMeta>({
    plugin_id: faker.datatype.uuid(),
    install_id: faker.datatype.number().toString(),
    location: locationFactory(locationId).build(),
    company: companyFactory().build(),
    auth: scope.length ? authFactory().build() : null,
    forwarded_bearer_token: faker.random.alphaNumeric(),
    route,
    config,
    params,
  });
}

export function eventMetaFactory(
  event: string,
  config: Record<string, unknown>,
  scope: Array<EnvoyUserAPIScope>,
  locationId: string,
): Sync.Factory<EnvoyEventMeta> {
  return Sync.makeFactory<EnvoyEventMeta>({
    plugin_id: faker.datatype.uuid(),
    install_id: faker.datatype.number().toString(),
    job: jobFactory(event).build(),
    location: locationFactory(locationId).build(),
    company: companyFactory().build(),
    auth: scope.length ? authFactory().build() : null,
    event,
    config,
  });
}