var router = require("express").Router();
const facility = require("../controllers/facility.controller");
const { verifyToken } = require("../middlewares/auth");

module.exports = (app) => {
  router.get("/", verifyToken, facility.list);
  router.put("/", verifyToken, facility.update);
  router.post("/", verifyToken, facility.create);
  app.use("/v1/facility", router);
};
