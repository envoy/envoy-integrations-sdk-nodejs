import JSONAPIModel from '../util/json-api/JSONAPIModel';

export type UserAttributes = {
  name: string;
  email: string;
};

export type UserModel = JSONAPIModel<UserAttributes, ''>;
