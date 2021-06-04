import JSONAPIModel from '../util/json-api/JSONAPIModel';

export interface AgreementAttributes {
  name: string;
  optional: boolean;
  'require-resign': boolean;
  body?: string;
  'video-url'?: string;
  enabled?: boolean;
  position?: number;
  'created-at'?: string;
  'updated-at'?: string;
}

export type AgreementRelationships = 'agreement-page';

export type AgreementModel = JSONAPIModel<AgreementAttributes, AgreementRelationships>;
