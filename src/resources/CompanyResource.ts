import JSONAPIModel from '../util/json-api/JSONAPIModel';

export interface CompanyAttributes {
  name: string;
  active: boolean;
  'created-at': string;
  'updated-at': string;
}

export type CompanyRelationships = 'locations';

export type CompanyModel = JSONAPIModel<CompanyAttributes, CompanyRelationships>;
