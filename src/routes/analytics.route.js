var router = require("express").Router();
const analytics = require("../controllers/analytics.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = (app) => {
  router.get("/day/", verifyToken, analytics.usage);
  router.get("/heatmap/", analytics.heatmap);
  router.get("/series/phases/", analytics.phases);
  app.use("/v1/analytics", router);
};
