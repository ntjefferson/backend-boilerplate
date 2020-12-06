const { Model } = require('objection');
const handleQueryResults = require('../../utils/handleQueryResults');
const db = require('../index');

Model.knex(db);

class UserModel extends Model {
  static query(trailId = null, ...args) {
    return super.query(...args).onBuildKnex((knexQueryBuilder) => {
      knexQueryBuilder.on('query-response', (err, queryData) => {
        handleQueryResults(queryData, { trailId });
      });
    });
  }

  static get tableName() {
    return 'users';
  }
}

module.exports = UserModel;
