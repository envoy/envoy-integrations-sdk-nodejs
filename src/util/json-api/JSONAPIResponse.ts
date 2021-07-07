export default interface JSONAPIResponse<Model> {
  data: Model,
  included?: Array<unknown>,
  meta?: Array<unknown>
}
