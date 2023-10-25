import JSONAPIData from '../util/json-api/JSONAPIData';

/**
 * @category Event
 */
type EmployeePayload = {
  'id': string,
  'type': 'employees',
  'links': { 'self': string },
  'attributes': {
    'cc-employee'?: boolean,
    'company-id'?: number,
    'deleted'?: boolean,
    'do-not-sync'?: boolean,
    'email'?: string | null,
    'hide-from-host-list'?: boolean,
    'manually-added'?: boolean,
    'manually-added-location-present'?: boolean,
    'name'?: string | null,
    'phone-number'?: string | null,
    'profile-picture-url'?: string | null,
    'cost-center'?: string | null,
    'division'?: string | null,
    'department'?: string | null,
    'organization'?: string | null,
    'title'?: string | null,
    'hide-from-employee-schedule'?: boolean,
    'favorite'?: null,
    'created-at': string,
    'deleted-at'?: string,
    'updated-at'?: string,
  },
  relationships: {
    company?: {
      data: JSONAPIData<'companies'>,
    },
    user?: {
      data: JSONAPIData<'users'>,
    },
    'default-location'?: {
      data: JSONAPIData<'default-locations'>,
    },
    assistants?: {
      data: JSONAPIData<'assistants'>,
    },
    bosses?: {
      data: JSONAPIData<'bosses'>,
    },
    manager?: {
      data: JSONAPIData<'managers'>,
    },
    'employee-locations'?: {
      data: JSONAPIData<'employee-locations'>,
    },
    location?: {
      data: JSONAPIData<'locations'>,
    },
    'employee-favorites'?: {
      data: JSONAPIData<'employee-favorites'>,
    },
    'workplace-groups'?: {
      data: JSONAPIData<'workplace-groups'>,
    },
  }
};

export default EmployeePayload;
