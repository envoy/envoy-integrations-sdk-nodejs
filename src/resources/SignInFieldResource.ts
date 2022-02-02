import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export interface SignInFieldAttributes {
  name: string;
  kind: string;
  required: boolean;
  identifier?: string;
  localized?: string;
  'ipad-localized-names': Array<{
    'language-code': string;
    'region-code'?: string;
    'display-name': string;
  }>;
  options?: Array<{
    value: string,
    position: number,
  }>,
  position?: number;
  'store-response'?: boolean;
  'created-at'?: string;
  'updated-at'?: string;
}

/**
 * @category API Resource
 */
export type SignInFieldRelationships = 'sign-in-field-page';

/**
 * @category API Resource
 */
export type SignInFieldModel = JSONAPIModel<SignInFieldAttributes, SignInFieldRelationships>;
