const db = require('../../db');
const handleQueryResults = require('../../utils/handleQueryResults');

/**
 * Gets user information
 * @name GET /api/v1/{userId}/getUser
 * @param {string} params.userId The user's Id
 */
const getUser = async (req, res, next) => {
  const { userId } = req.params;

  const data = await db
    .select('*')
    .from('users')
    .where('id', '=', userId)
    .first()
    .on('query-response', (response, obj) => {
      req.query = handleQueryResults(obj);
    });

  res.status(200).json(data);
};

module.exports = { getUser };
