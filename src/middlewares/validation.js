const validator = require("validator");

module.exports.isEmail = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    return res.status(422).json({ error: "INVALID_EMAIL" });
  } else {
    next();
  }
};

module.exports.isPassword = (req, res, next) => {
  console.log()
  if (!validator.isStrongPassword(req.body.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false, pointsPerUnique: 0, pointsPerRepeat: 0 , pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
    return res.status(422).json({ error: "INVALID_PASSWORD" });
  } else {
    next();
  }
};

module.exports.isUsername = (req, res, next) => {
  if (!validator.isAlpha(req.body.name.split(' ').join(''))) {
    return res.status(422).json({ error: "INVALID_USERNAME" });
  } else {
    next();
  }
};
