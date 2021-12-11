var router = require("express").Router();
const facility = require("../controllers/facility.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = (app) => {
  router.get("/", verifyToken, facility.list);
  router.put("/", verifyToken, facility.update);
  router.post("/", verifyToken, facility.create);
  router.delete("/", verifyToken, facility.delete);

  router.post("/usage/list", verifyToken, facility.listUsage);
  router.put("/usage/", verifyToken, facility.updateUsage);
  router.post("/usage/", verifyToken, facility.createUsage);
  router.delete("/usage/", verifyToken, facility.deleteUsage);

  app.use("/v1/facility", router);
};
