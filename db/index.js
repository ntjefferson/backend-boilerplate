const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig);

db.on('query-error', (err, obj) => {
  const error = {};
  error.message = 'There was an error querying the database. Please contact support.';
  error.query = obj;
  error.details = err;
  throw error;
});

module.exports = db;
