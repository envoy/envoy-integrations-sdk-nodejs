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
  userId: number;

  // Optional fields
  deskId?: number | null;
  locationId?: number | null;
  inviteId?: number | null;
  entryId?: number | null;
  startTime?: number | null;  // Unix timestamp
  endTime?: number | null;    // Unix timestamp

  meta?: {
    autoAssignDesk?: boolean;
  };
}

export type ReservationRelationships = 'location' | 'desk' | 'company' | 'floor' | 'employee' | 'entry' | 'invite' | 'user';

export type ReservationModel = JSONAPIModel<ReservationAttributes, ReservationRelationships, 'reservations'>


