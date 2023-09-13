// Connecting to DB
const pg = require("pg");
const { Pool } = pg;
// const { Pool } = require("pg");

const { dbHost, dbName, dbPass, dbUser } = require("./environments");

// inisialisasi connection object
const db = new Pool({
  host: dbHost,
  database: dbName,
  user: dbUser,
  password: dbPass,
});

module.exports = db;
