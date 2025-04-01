import { DateTime } from 'luxon';
import JSONAPIData from '../util/json-api/JSONAPIData';

/**
 * @category Event
 */
type InvitePayload = {
  id: string,
  type: 'invites',
  attributes: {
    'employee-screening-flow': boolean,
    'full-name': string,
    email: string | null,
    'inviter-name': string | null,
    'inviter-email': string | null,
    'expected-arrival-time': string,
    'private-notes': string | null,
    arrived: boolean,
    'been-here-before': boolean,
    'flow-name': string,
    'flow-id': string,
    'user-data': Array<{
      field: string,
      value: string | null,
    }>,
    nda?: string,
    'secret-token': string,
    'edit-token': string,
    'photo-url': string | null,
    'qr-code': string | null,
    'qr-code-sent-at': string | null,
    'preregistration-complete': boolean,
    'reminder-sent-at': string | null,
    'legal-docs'?: Array<{
      id: string,
      url: string,
      'signed-at': string,
      agreement: {
        id: string,
      },
    }>,
    'signed-in-at'?: string,
    'signed-out-at'?: string,
  },
  relationships: {
    entry?: {
      data: JSONAPIData<'entries'>,
    },
    location: {
      data: JSONAPIData<'locations'>,
    },
    flow?: {
      data: JSONAPIData<'flows'>,
    },
    employee?: {
      data: JSONAPIData<'employees'>,
    },
    'agreeable-ndas'?: {
      data: Array<JSONAPIData<'agreeable-ndas'>>,
    },
    tenant?: {
      data: JSONAPIData<'tenants'>,
    },
    'invitee-employee'?: {
      data: JSONAPIData<'employees'>,
    },
    creator?: {
      data: JSONAPIData<'users'>,
    },
  }
};

export function normalizeInvitePayload(payload: InvitePayload): InvitePayload {
  const { 'legal-docs': legalDocs } = payload.attributes;
  const normalized = { ...payload };
  if (Array.isArray(legalDocs) && legalDocs.length) {
    normalized.attributes['legal-docs'] = legalDocs.map((doc) => ({
      ...doc,
      'signed-at': DateTime.fromSQL(doc['signed-at'], { zone: 'UTC' }).toISO(),
    }));
  }
  return normalized;
}

export default InvitePayload;
