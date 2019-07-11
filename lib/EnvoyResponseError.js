/**
 * Using a custom error for easy identification in logs,
 * and for checking error types if necessary.
 */
class EnvoyResponseError extends Error {

  constructor(body, message = 'Envoy API response caused an error.') {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    this.body = body;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = EnvoyResponseError;
