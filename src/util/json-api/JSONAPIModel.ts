import JSONAPIData from './JSONAPIData';

export default interface JSONAPIModel<Attributes, Relationships extends string, Type = string, ID = string>
  extends JSONAPIData<Type, ID> {
  attributes: Attributes;
  relationships: {
    [key in Relationships]: {
      data: JSONAPIData | Array<JSONAPIData> | null;
    };
  };
}
