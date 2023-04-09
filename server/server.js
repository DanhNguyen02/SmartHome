const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", require("./routes/auth"));
// get driver connection
const dbo = require("./db/conn");
const mqtt = require("./mqtt/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  mqtt.subcribe(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});