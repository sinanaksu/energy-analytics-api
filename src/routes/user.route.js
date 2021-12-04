var router = require("express").Router();
const user = require("../controllers/user.controller");
const {
  isEmail,
  isUsername,
  isPassword,
} = require("../middlewares/validation");

module.exports = (app) => {
  router.post("/login", isEmail, isPassword, user.login);
  router.post("/register", isEmail, isUsername, isPassword, user.register);
  app.use("/v1/user", router);
};
