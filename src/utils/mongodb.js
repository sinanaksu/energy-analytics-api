const mongo = require("mongoose");
const config = require("./config");

const mongodb = mongo.connect(
  config.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

module.exports = mongodb;
