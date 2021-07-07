import JSONAPIFilterParams from './JSONAPIFilterParams';

export default interface JSONAPIPaginationParams<FilterFields, SortFields extends string>
  extends JSONAPIFilterParams<FilterFields> {

  page?: {
    offset?: number;
    limit?: number;
  }

  sort?: SortFields;
}
