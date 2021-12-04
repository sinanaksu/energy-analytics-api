const User = require("../models/user.model");
var bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const data = req.body;
  data.password = bcrypt.hashSync(data.password, 8);

  await User.create(data)
    .then((user) => {
      user.password = undefined;
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
