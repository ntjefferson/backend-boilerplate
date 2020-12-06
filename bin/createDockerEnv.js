#!/usr/bin/env node
/* eslint-disable no-console */
process.env.DEV_DB_HOST = 'localhost';

const { execSync } = require('child_process');

const cyanLog = (text) => console.log(`\x1b[36m${text}\x1b[0m`);

const fullSetup = async () => {
  cyanLog('🐳 Creating docker containers...');
  execSync('docker-compose up -d',
    { stdio: 'inherit' });

  let retries = 2;
  while (retries) {
    try {
      cyanLog('🐘 Starting database migrations...');
      execSync('npx knex --knexfile=./db/knexfile.js migrate:latest ',
        { stdio: 'inherit' });
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      if (!retries) {
        process.exit(1);
      }
      console.log('Trying database migrations again.');
      // eslint-disable-next-line no-await-in-loop
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  cyanLog('🌱 Seeding the database...');
  execSync('npx knex --knexfile=./db/knexfile.js seed:run',
    { stdio: 'inherit' });

  cyanLog('👋 Deleting unused docker images...');
  execSync('docker system prune -f',
    { stdio: 'inherit' });

  cyanLog('✔️ Finished creating Docker dev environment.');
};

fullSetup();
