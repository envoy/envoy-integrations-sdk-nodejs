import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type SignInFieldPageAttributes = {
  enabled?: boolean;
  position?: number;
};

export type AgreementPageRelationships = 'flow' | 'agreements';

export type AgreementPageModel = JSONAPIModel<SignInFieldPageAttributes, AgreementPageRelationships>;
