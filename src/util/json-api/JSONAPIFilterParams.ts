import JSONAPIParams from './JSONAPIParams';

export default interface JSONAPIFilterParams<FilterFields> extends JSONAPIParams {
  filter?: FilterFields;
}
