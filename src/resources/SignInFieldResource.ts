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
    value: string;
    position: number;
  }>;
  position?: number;
  'store-response'?: boolean;
  /**
   * Whether a visitor may answer this field during invite and sign-in.
   * Defaults to true server-side, so a field created without it is offered to
   * visitors.
   */
  'allow-visitor-respondents'?: boolean;
  /**
   * Whether an employee may answer this field during invite and sign-in.
   * Defaults to true server-side, so a field created without it is offered to
   * employees.
   *
   * Set this and `'allow-visitor-respondents'` to false for a field only an admin
   * can answer, such as a badge or card number that is read off the credential.
   */
  'allow-employee-respondents'?: boolean;
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
