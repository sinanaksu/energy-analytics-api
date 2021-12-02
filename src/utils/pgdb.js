const { Client } = require("pg");
const config = require("./config");

const pgdb = new Client(config.POSTGRES_URI);

pgdb.connect((err) => {
  if (err) {
    console.error(err);
  }
});

module.exports = pgdb;
