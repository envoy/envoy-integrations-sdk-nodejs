/**
 * Use these status codes to inform Envoy of a job's or route's status.
 *
 * @internal
 */
enum HttpStatus {
  ONGOING = 202,
  IGNORED = 400,
  FAILED = 412,
  UNEXPECTED_FAILURE = 500,
}
export default HttpStatus;
