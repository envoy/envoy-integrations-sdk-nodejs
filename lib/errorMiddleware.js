const HttpStatus = require('./HttpStatus');

/**
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.statusCode = HttpStatus.UNEXPECTED_FAILURE;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: err.message }));
}

module.exports = () => errorMiddleware;
