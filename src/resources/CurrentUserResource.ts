import JSONAPIModel from '../util/json-api/JSONAPIModel';

export interface CurrentUserAttributes {
  'full-name': string;
  email: string;
}

export type CurrentUserRelationships = 'location-roles' | 'company-roles';

export type CurrentUserModel = JSONAPIModel<CurrentUserAttributes, CurrentUserRelationships>;
