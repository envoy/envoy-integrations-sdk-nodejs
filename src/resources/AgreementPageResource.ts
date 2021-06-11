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
export type AgreementPageRelationships = 'flow' | 'agreements';

/**
 * @category API Resource
 */
export type AgreementPageModel = JSONAPIModel<SignInFieldPageAttributes, AgreementPageRelationships>;
