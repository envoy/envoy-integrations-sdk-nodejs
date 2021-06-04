export default interface JSONAPIResponse<Model> {
  data: Model,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  included?: Array<any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Array<any>
}
