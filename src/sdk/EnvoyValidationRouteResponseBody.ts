type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Config to merge with existing config.
 * It should likely include validated values from the request payload and optionally additional config values.
 *
 * @category Response Body
 */
type EnvoyValidationRouteResponseBody<Config> = Nullable<Partial<Config>>;
export default EnvoyValidationRouteResponseBody;
