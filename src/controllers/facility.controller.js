const pgdb = require("../utils/pgdb");

exports.list = async (req, res) => {
  await pgdb
    .query("SELECT * FROM facilities")
    .then((facilities) => {
      console.log(facilities.rows);
      res.json(facilities.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.create = async (req, res) => {
  const text =
    'INSERT INTO "public"."facilities" ("name", "start_date", "end_date", "workers", "special") VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    req.body.name,
    req.body.start_date,
    req.body.end_date,
    req.body.workers,
    req.body.special,
  ];
  await pgdb
    .query(text, values)
    .then((facilities) => {
      console.log(facilities.rows);
      res.json(facilities.rows[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.update = async (req, res) => {
  const text =
    'UPDATE "public"."facilities" SET "name" = $1, "start_date" = $2, "end_date" = $3, "workers" = $4, "special" = $5 WHERE "id" = $6  RETURNING *';
  const values = [
    req.body.name,
    req.body.start_date,
    req.body.end_date,
    req.body.workers,
    req.body.special,
    req.body.id,
  ];
  await pgdb
    .query(text, values)
    .then((facilities) => {
      console.log(facilities);
      res.json(facilities.rows[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
