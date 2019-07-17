/**
 * A helper function to use async/await in express.
 * It forwards rejected promises back to express.
 *
 * @param {Function} handler
 * @returns {Function}
 */
function asyncHandler(handler) {

  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = asyncHandler;
