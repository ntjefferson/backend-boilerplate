const firebaseAdmin = require('../../config/firebase');

/**
 * Verifies the user's id against Firebase's uid
 * @param {Object} req Express request object
 * @param {Object} res Express response object
 * @param {Function} next Express next function
 */
const verifyFirebase = async (req, res, next) => {
  const token = req.header('Authorization');
  const { userId } = req.params;

  if (!token) {
    const err = new Error('No token, authorization denied.');
    err.status = 401;
    return next(err);
  }

  const { uid } = await firebaseAdmin.auth().verifyIdToken(token);

  if (uid === userId) {
    return next();
  }

  const err = new Error('You are not authorized for this request.');
  err.status = 400;
  return next(err);
};

module.exports = verifyFirebase;
