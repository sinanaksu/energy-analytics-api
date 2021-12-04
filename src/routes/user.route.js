var router = require("express").Router();
const user = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth");

const {
  isEmail,
  isUsername,
  isPassword,
} = require("../middlewares/validation");

module.exports = (app) => {
  router.get("/me", verifyToken, user.me);
  router.post("/login", isEmail, isPassword, user.login);
  router.post("/register", isEmail, isUsername, isPassword, user.register);
  app.use("/v1/user", router);
};
