const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride());

app.get("/user", (req, res) => {
  res.json(200);
});

const server = app.listen(5000, () => {
  console.log(
    "Server has started... Port: http://localhost:%d",
    server.address().port
  );
});

module.exports = server;