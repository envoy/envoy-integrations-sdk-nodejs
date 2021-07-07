import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
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

/**
 * @category API Resource
 */
export type AgreementRelationships = 'agreement-page';

/**
 * @category API Resource
 */
export type AgreementModel = JSONAPIModel<AgreementAttributes, AgreementRelationships>;
