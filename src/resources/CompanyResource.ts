import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export interface CompanyAttributes {
  name: string;
  active: boolean;
  'created-at': string;
  'updated-at': string;
}

/**
 * @category API Resource
 */
export type CompanyRelationships = 'locations';

/**
 * @category API Resource
 */
export type CompanyModel = JSONAPIModel<CompanyAttributes, CompanyRelationships>;
