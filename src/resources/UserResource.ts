import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export type UserAttributes = {
  name: string;
  email: string;
};

/**
 * @category API Resource
 */
export type UserModel = JSONAPIModel<UserAttributes, ''>;
