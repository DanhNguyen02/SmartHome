const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./routes/record"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/profile"));
app.use("/api", require("./routes/device"));
// get driver connection
const dbo = require("./db/conn");
const mqtt = require("./mqtt/conn");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
  mqtt.subcribe(function (err) {
    if (err) console.error(err);
  });
});
