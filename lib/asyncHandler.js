/**
 * Catches Promise-based errors.
 *
 * @param {Function} handler
 * @returns {Function}
 */
function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = asyncHandler;
