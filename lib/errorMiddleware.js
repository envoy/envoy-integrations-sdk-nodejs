const HttpStatus = require('./HttpStatus');

/**
 *
 * @param {Function} onError
 * @returns {Function}
 */
function errorMiddleware(onError = () => {}) {

  /**
   * @param err
   * @param req
   * @param res
   * @param next
   */
  return (err, req, res, next) => {
    onError(err);
    if (res.headersSent) {
      return next(err);
    }
    res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: err.message }));
  };
}

module.exports = errorMiddleware;
