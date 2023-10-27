export type ConnectEmployeePayload = {
  data: ConnectEmployeeData,
  included: ConnectIncluded,
};

type ConnectEmployeeData = {
  'id': string,
  'type': 'connect-employees',
  'attributes': ConnectEmployeeDataAttributes,
  'relationships': ConnectEmployeeDataRelationships,
};

type ConnectEmployeeDataAttributes = {
  'name': string,
  'profile-picture-url': string | null,
};

type ConnectEmployeeDataRelationships = {
  'properties': ConnectEmployeeDataRelationshipsPropertiesData,
  'tenants': ConnectEmployeeDataRelationshipsPropertiesData
};

type ConnectEmployeeDataRelationshipsPropertiesData = {
  'data': [{ 'type': string, 'id': string }]
};

type ConnectIncluded = {
  'included': [
    {
      'id': string,
      'type': 'zones',
      'attributes': {
        'address': string,
        'name': string,
        'visitor-photos-enabled': boolean,
        'employee-rebadging-enabled': boolean
      }
    },
    {
      'id': string,
      'type': 'tenants',
      'attributes': { 'name': string }
    },
  ],
  'meta': {
    'limit': number,
    'offset': number
  }
};
