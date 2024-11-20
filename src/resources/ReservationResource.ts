import JSONAPIModel from "../util/json-api/JSONAPIModel";

export interface ReservationAttributes {
    'is-partial-day': boolean;
    'updated-at': number;
    'is-assignable': boolean;
    'name': string;
    'assigned-to': string | null;
    'neighborhood-id': number;
    'created-at': number;
    'neighborhood': number | null;
    'parent-desk-id': string | null;
    'availability': string | null;
    'enabled': boolean;
    'x-pos': number | null;
    'y-pos': number | null;
}

export interface ReservationCreationAttributes {
  // Required fields
  'user-id': number;

  // Optional fields
  'desk-id'?: number | null;
  'location-id'?: number | null;
  'invite-id'?: number | null;
  'entry-id'?: number | null;
  'start-time'?: number | null;  // Unix timestamp
  'end-time'?: number | null;    // Unix timestamp

  meta?: {
    'auto-assign-desk'?: boolean;
  };
}

export type ReservationRelationships = 'location' | 'desk' | 'company' | 'floor' | 'employee' | 'entry' | 'invite' | 'user';

export type ReservationModel = JSONAPIModel<ReservationAttributes, ReservationRelationships, 'reservations'>


