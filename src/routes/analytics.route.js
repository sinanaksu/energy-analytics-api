var router = require("express").Router();
const analytics = require("../controllers/analytics.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = (app) => {
  router.get("/day/", verifyToken, analytics.usage);

  app.use("/v1/analytics", router);
};