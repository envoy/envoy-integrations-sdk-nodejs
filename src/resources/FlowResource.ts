import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type FlowSortFields = 'name' | 'created_at' | '-name' | '-created_at';

export interface FlowFilterFields {
  'employee-centric'?: boolean;
  location?: string;
}

export interface FlowAttributes {
  name: string;
  'employee-centric'?: boolean;
  enabled?: boolean;
  'created-at'?: string;
  'updated-at'?: string;
}

export type FlowRelationships = 'location' | 'sign-in-field-page' | 'agreement-page';

export type FlowModel = JSONAPIModel<FlowAttributes, FlowRelationships>;
