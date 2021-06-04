import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type SignInFieldPageAttributes = {
  enabled?: boolean;
  position?: number;
};

export type SignInFieldPageRelationships = 'flow'
| 'actionable-sign-in-field-actions'
| 'actionable-sign-in-fields'
| 'sign-in-field-actions'
| 'sign-in-fields';

export type SignInFieldPageModel = JSONAPIModel<SignInFieldPageAttributes, SignInFieldPageRelationships>;
