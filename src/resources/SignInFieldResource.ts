import JSONAPIModel from '../util/json-api/JSONAPIModel';

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
  position?: number;
  'store-response'?: boolean;
  'created-at'?: string;
  'updated-at'?: string;
}

export type SignInFieldRelationships = 'sign-in-field-page';

export type SignInFieldModel = JSONAPIModel<SignInFieldAttributes, SignInFieldRelationships>;
