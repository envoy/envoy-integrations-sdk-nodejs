/**
 * @category Meta
 */
export type EnvoyMetaJob<Event extends string = string> = {
  id: string,
  name: Event,
  identifier: string,
};

/**
 * @category Meta
 */
export type EnvoyMetaLocation = {
  id: string,
  type: 'locations',
  attributes: {
    name: string,
    'company-name-override': string | null,
    timezone: string,
    locale: string | null,
    address: string,
    'address-line-one': string | null,
    'address-line-two': string | null,
    city: string | null,
    state: string | null,
    country: string | null,
    zip: string | null,
    longitude: number | null,
    latitude: number | null,
    'created-at': string,
  }
};

/**
 * @category Meta
 */
export type EnvoyMetaCompany = {
  id: string,
  type: 'companies',
  attributes: {
    name: string,
    active: boolean,
    'created-at': string,
  }
};

/**
 * @category Meta
 */
export type EnvoyMetaZone = {
  id: string,
  type: 'zones',
  attributes: {
    address: string | null,
    'logo-url': string | null,
    name: string,
    'time-zone': string,
  }
};

/**
 * A short-lived `userAPI` token.
 * Will be used to construct the `userAPI` property found in `req.envoy.userAPI`.
 *
 * @category Meta
 */
export type EnvoyMetaAuth = {
  token_type: 'Bearer',
  access_token: string,
  expires_in: number,
  refresh_token: string | null,
  refresh_token_expires_in: number | null,
};

/**
 * Metadata that will be included in the request body for events.
 *
 * @category Meta
 */
export type EnvoyEventMeta<Event extends string = string, Config = Record<string, unknown>> = {
  event: Event,
  plugin_id: string,
  install_id: string,
  config: Config,
  job: EnvoyMetaJob<Event>,
  location: EnvoyMetaLocation,
  company: EnvoyMetaCompany,
  zone: EnvoyMetaZone,
  auth: EnvoyMetaAuth | null,
};

/**
 * Metadata that will be included in the request body for setup routes,
 * like validation URLs or options URLs.
 *
 * @category Meta
 */
export type EnvoyRouteMeta<Config = Record<string, unknown>, Params = Record<string, unknown>> = {
  route: string,
  plugin_id: string,
  install_id: string,
  config: Config,
  params: Params,
  location: EnvoyMetaLocation,
  company: EnvoyMetaCompany,
  zone: EnvoyMetaZone,
  auth: EnvoyMetaAuth | null,
  forwarded_bearer_token?: string,
};

/**
 * Metadata that will be included in every request Envoy sends to your plugin.
 *
 * @category Meta
 */
type EnvoyMeta = EnvoyEventMeta | EnvoyRouteMeta;
export default EnvoyMeta;
