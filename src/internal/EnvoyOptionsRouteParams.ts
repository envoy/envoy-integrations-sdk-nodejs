type EnvoyOptionsRouteParams = {
  search?: string;
  page?: number;
  cursor?: string;
  zone_id?: string;
  location_id?: string;
  /** ID of selected option when this is a mapped field. */
  parent_resource_id?: string;
};

export default EnvoyOptionsRouteParams;
