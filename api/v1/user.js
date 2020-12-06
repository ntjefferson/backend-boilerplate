const UserModel = require('../../db/models/UserModel');
const { checkForEmptyValues } = require('../utils/validation');

/**
 * Gets user information
 * @name GET /v1/{userId}/getUser
 * @param {string} params.userId The user's FB id
 */
const getUser = async (req, res, next) => {
  const { userId } = req.params;

  const data = await UserModel
    .query(req.trailId)
    .where({ id: userId })
    .first();

  res.status(200).json(data);
};

/**
 * Updates a user
 * @name POST /v1/{userId}/updateUser
 * @param {string} params.userId The user's FB id
 * @param {string} body.firstName The user's first name
 * @param {string} body.lastName The user's last name
 * @param {string} body.email The user's email address
 */
const updateUser = async (req, res, next) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    email,
  } = req.body;

  checkForEmptyValues([firstName, lastName, email]);

  const data = await UserModel
    .query(req.trailId)
    .findById(userId)
    .patch({
      firstName,
      lastName,
      email,
    })
    .returning('*');

  res.status(200).json(data);
};

module.exports = { getUser, updateUser };
