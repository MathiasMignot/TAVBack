const debug = require('debug')('tmm:database');
const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

pool.connect().then(() => {
  debug('database client connected');
});

module.exports = {
  originalClient: pool,
  async query(...params) { // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Functions/rest_parameters
    debug(...params); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return this.originalClient.query(...params);
  },
};