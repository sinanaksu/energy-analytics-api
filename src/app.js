const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./utils/mongodb");
require("./routes/user.route")(app);

const server = app.listen(5000);

module.exports = server;
