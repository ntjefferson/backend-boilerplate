/**
 * Wraps API route functions and sends error request forward for logging
 * @param {Function} fn wrapper for API routes
 */
const handleException = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    next(err);
  });
};

module.exports = handleException;
