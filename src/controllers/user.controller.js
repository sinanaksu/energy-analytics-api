const User = require("../models/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

// User Register Controller
exports.register = async (req, res) => {
  await User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(200).send({ error: err });
      return;
    }
    if (user) {
      res.status(200).send({ error: "USER_FOUND" });
      return;
    }

    const data = req.body;
    data.password = bcrypt.hashSync(data.password, 8);

    User.create(data)
      .then((user) => {
        user.password = undefined;
        res.json(user);
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  });
};

// User Login Controller
exports.login = async (req, res) => {
  await User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(200).send({ error: err });
      return;
    }

    if (!user) {
      res.status(200).send({ error: "USER_NOT_FOUND" });
      return;
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      res.status(200).send({
        accessToken: null,
        error: "USER_NOT_FOUND",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.name,
      email: user.email,
      accessToken: token,
    });
  });
};

// User Info Controller
exports.me = async (req, res) => {
  await User.findById(req.body.userId)
    .then((user) => {
      user.password = undefined;
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
