import { DateTime } from 'luxon';
import JSONAPIData from '../util/json-api/JSONAPIData';

/**
 * @category Event
 */
type EntryPayload = {
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
    }>,
    'approval-status'?: {
      status: string,
      'auto-approved': boolean,
      report: Array<{
        reason?: string,
        result: string,
        source: string,
        messages: Array<{
          failure: {
            text: string,
            header: string,
          },
        }>,
      }>,
      blacklistReportUUID?: string,
    },
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
};

export function normalizeEntryPayload(payload : EntryPayload): EntryPayload {
  const {
    'signed-in-at': signedInAt,
    'signed-out-at': signedOutAt,
    'legal-docs': legalDocs,
  } = payload.attributes;
  const normalized = { ...payload };
  normalized.attributes['signed-in-at'] = DateTime.fromSQL(signedInAt, { zone: 'UTC' }).toISO();
  if (signedOutAt) {
    normalized.attributes['signed-out-at'] = DateTime.fromSQL(signedOutAt, { zone: 'UTC' }).toISO();
  }
  if (Array.isArray(legalDocs) && legalDocs.length) {
    normalized.attributes['legal-docs'] = legalDocs.map((doc) => ({
      ...doc,
      'signed-at': DateTime.fromSQL(doc['signed-at'], { zone: 'UTC' }).toISO(),
    }));
  }
  return normalized;
}

export default EntryPayload;
