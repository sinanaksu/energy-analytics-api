const pg = require("pg");
const config = require("./config");

const types = pg.types
types.setTypeParser(types.builtins.DATE, (timeStr) => timeStr);

const pgdb = new pg.Client(config.POSTGRES_URI);

pgdb.connect((err) => {
  if (err) {
    console.error(err);
  }
});

module.exports = pgdb;
