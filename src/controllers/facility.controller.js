const pgdb = require("../utils/pgdb");

exports.list = async (req, res) => {
  await pgdb
    .query("SELECT * FROM facilities ORDER BY id DESC")
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
      const q = facilities.rows[0];
      pgdb.query(
        'CREATE TABLE "public"."energy_usage_' +
          q.id +
          '" ("id" SERIAL,"unit" varchar(255) COLLATE "pg_catalog"."default","usage" int8,"total" int8,"discount" bool,"start_date" date,"end_date" date);INSERT INTO "public"."energy_usage_' +
          q.id +
          "\" VALUES (nextval('energy_usage_" +
          q.id +
          "_id_seq'::regclass), 'TL', 648, 1027, 't', '2021-10-01', '2021-10-31');INSERT INTO \"public\".\"energy_usage_" +
          q.id +
          "\" VALUES (nextval('energy_usage_" +
          q.id +
          "_id_seq'::regclass), 'Dolar', 143, 168, 'f', '2021-11-01', '2021-11-30');"
      );
      res.json(q);
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

exports.delete = async (req, res) => {
  const text = 'DELETE FROM "public"."facilities" WHERE "id" = $1 RETURNING *';
  const values = [req.body.id];
  await pgdb
    .query(text, values)
    .then((facilities) => {
      pgdb.query(
        'DROP TABLE IF EXISTS "public"."energy_usage_' + req.body.id + '";'
      );
      res.json(facilities.rows[0]);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.listUsage = async (req, res) => {
  await pgdb
    .query(
      "SELECT * FROM energy_usage_" +
        req.body.id +
        "  WHERE 1=1 ORDER BY id DESC"
    )
    .then((facilities) => {
      console.log(facilities.rows);
      res.json(facilities.rows);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.createUsage = async (req, res) => {
  const text =
    'INSERT INTO "public"."energy_usage_' +
    req.body.id +
    "\" VALUES (nextval('energy_usage_" +
    req.body.id +
    "_id_seq'::regclass), $1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    req.body.usage.unit,
    req.body.usage.usage,
    req.body.usage.total,
    req.body.usage.discount,
    req.body.usage.start_date,
    req.body.usage.end_date,
  ];
  await pgdb
    .query(text, values)
    .then((facilities) => {
      const q = facilities.rows[0];
      res.json(q);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.updateUsage = async (req, res) => {
  const text =
    'UPDATE "public"."energy_usage_' +
    req.body.id +
    '" SET "unit" = $1, "usage" = $2, "total" = $3, "discount" = $4, "start_date" = $5, "end_date" = $6 WHERE "id" = $7 RETURNING *';
  const values = [
    req.body.usage.unit,
    req.body.usage.usage,
    req.body.usage.total,
    req.body.usage.discount,
    req.body.usage.start_date,
    req.body.usage.end_date,
    req.body.usage.id,
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

exports.deleteUsage = async (req, res) => {
  const text =
    'DELETE FROM "public"."energy_usage_' +
    req.body.id +
    '" WHERE "id" = $1 RETURNING *';
  const values = [req.body.usage.id];
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
