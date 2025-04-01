import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export type SignInFieldPageAttributes = {
  enabled?: boolean;
  position?: number;
};

/**
 * @category API Resource
 */
export type SignInFieldPageRelationships = 'flow'
| 'actionable-sign-in-field-actions'
| 'actionable-sign-in-fields'
| 'sign-in-field-actions'
| 'sign-in-fields';

/**
 * @category API Resource
 */
export type SignInFieldPageModel = JSONAPIModel<SignInFieldPageAttributes, SignInFieldPageRelationships>;
