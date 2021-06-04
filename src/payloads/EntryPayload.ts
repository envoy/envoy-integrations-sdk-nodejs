import JSONAPIData from '../util/json-api/JSONAPIData';

export default interface EntryPayload {
  id: string,
  type: 'entries',
  attributes: {
    'full-name': string,
    'phone-number'?: string,
    email: string | null,
    'employee-screening-flow': boolean,
    host: string | null,
    'host-email': string | null,
    'private-notes': string | null,
    'signed-in-at': string,
    'signed-out-at'?: string,
    thumbnails: {
      large: string | null,
      original: string | null,
      small: string | null,
    },
    'flow-name': string,
    nda?: string,
    'legal-docs'?: Array<{
      id: string,
      url: string,
      'signed-at': string,
      agreement: {
        id: string,
      },
    }>,
    'user-data': Array<{
      field: string,
      value: string | null,
    }>
  },
  relationships: {
    location: {
      data: JSONAPIData<'locations'>,
    },
    'visitor-entrance'?: {
      data: JSONAPIData<'visitor-entrances'>,
    },
    device?: {
      data: JSONAPIData<'devices'>,
    },
    employee?: {
      data: JSONAPIData<'employees'>,
    },
    invite?: {
      data: JSONAPIData<'invites'>,
    },
    flow?: {
      data: JSONAPIData<'flows'>,
    },
    'agreeable-ndas'?: {
      data: Array<JSONAPIData<'agreeable-ndas'>>,
    }
  }
}
