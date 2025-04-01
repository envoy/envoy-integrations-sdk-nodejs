import JSONAPIModel from '../util/json-api/JSONAPIModel';

export interface LocationRoleAttributes {
  'role-name': string;
  'confirmed-at': string;
}

export type LocationRoleRelationships = 'location';

export type LocationRoleModel = JSONAPIModel<LocationRoleAttributes, LocationRoleRelationships>;
