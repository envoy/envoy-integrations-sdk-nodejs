export default interface JSONAPIData<Type = string, ID = string> {
  id: ID;
  type: Type;
}
