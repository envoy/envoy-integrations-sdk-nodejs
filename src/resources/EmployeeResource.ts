import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type EmployeeSortFields = 'name' | 'created_at' | '-name' | '-created_at';

export interface EmployeeFilterFields {
  deleted?: boolean;
  company?: string;
  locations?: string;
  email?: string;
  except?: string;
  'exclude-locations'?: string;
  'exclude-hidden'?: boolean;
  'manually-added'?: boolean;
  name?: string;
  query?: string;
}

export interface EmployeeAttributes {
  name: string;
  email: string;
  'phone-number'?: string;
  'profile-picture-url'?: string;
  deleted?: boolean;
  'company-id'?: string;
  'created-at'?: string;
  'updated-at'?: string;
  'deleted-at'?: string;
}

export type EmployeeRelationships = 'locations' | 'company';

export type EmployeeModel = JSONAPIModel<EmployeeAttributes, EmployeeRelationships>;
