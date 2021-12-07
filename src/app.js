const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

require("./utils/mongodb");
require("./routes/user.route")(app);
require("./routes/facility.route")(app);

const server = app.listen(5000);

module.exports = server;
