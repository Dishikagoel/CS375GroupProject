const { Pool } = require("pg");
const env = require("../env.json");
const pool = new Pool(env);

module.exports = pool;
