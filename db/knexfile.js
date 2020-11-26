require('dotenv').config({ path: `${__dirname}../../.env` });

const environtmentDb = {
  test: {
    client: 'pg',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.TEST_DB_NAME,
      port: process.env.DEV_DB_PORT,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  development: {
    client: 'pg',
    connection: {
      host: process.env.DEV_DB_HOST,
      database: process.env.DEV_DB_NAME,
      port: process.env.DEV_DB_PORT,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
  },
  production: {
    client: 'pg',
    searchPath: process.env.DB_SCHEMA,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
  },
};

const environment = process.env.NODE_ENV || 'development';

module.exports = environtmentDb[environment];
