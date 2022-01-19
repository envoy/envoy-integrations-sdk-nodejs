import JSONAPIModel from '../util/json-api/JSONAPIModel';

export interface CompanyRoleAttributes {
  'role-name': string;
  'confirmed-at': string;
}

export type CompanyRoleRelationships = 'company';

export type CompanyRoleModel = JSONAPIModel<CompanyRoleAttributes, CompanyRoleRelationships>;
