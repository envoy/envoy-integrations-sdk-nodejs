import JSONAPIModel from '../util/json-api/JSONAPIModel';

/**
 * @category API Resource
 */
export interface TakeoverAttributes {
  metadata: {
    title: string;
    message: string;
    created_at: string;
    type: 'critical' | 'normal';
  };
  'start-at': number;
  'end-at': number | null;
}

/**
 * @category API Resource
 */
export type TakeoverRelationships = 'location' | 'company';

/**
 * @category API Resource
 */
export type TakeoverModel = JSONAPIModel<TakeoverAttributes, TakeoverRelationships>;
