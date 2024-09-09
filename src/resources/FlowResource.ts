import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export type FlowSortFields = 'name' | 'created_at' | '-name' | '-created_at';

/**
 * @category API Resource
 */
export interface FlowFilterFields {
  'employee-centric'?: boolean;
  enabled?: boolean;
  location?: string;
}

/**
 * @category API Resource
 */
export interface FlowAttributes {
  name: string;
  'employee-centric': boolean;
  enabled: boolean;
  'created-at': string;
  'updated-at': string;
}

/**
 * @category API Resource
 */
export type FlowRelationships = 'location' | 'sign-in-field-page' | 'agreement-page';

/**
 * @category API Resource
 */
export type FlowModel = JSONAPIModel<FlowAttributes, FlowRelationships>;
