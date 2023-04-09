const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
const mqtt = require("../mqtt/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a temp of current.
recordRoutes.route("/temp").get(function (req, res) {
  let db_connect = dbo.getDb("smarthome");
  db_connect
    .collection("yolo-temp")
    .find()
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result[0]);
    });
});

// This section will help you get a humi of current.
recordRoutes.route("/humi").get(function (req, res) {
  let db_connect = dbo.getDb("smarthome");
  db_connect
    .collection("yolo-humi")
    .find()
    .sort({ _id: -1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result[0]);
    });
});

// This section will help you create a new data of light in adafruit server.
recordRoutes.route("/light/add").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

// This section will help you create a new data of fan in adafruit server.
recordRoutes.route("/fan/add").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    },
  };
  db_connect
    .collection("room")
    .insertOne(message, function (err, res) {
      if (err) throw err;
    })
});

recordRoutes.route("/rooms").get(function (req, res) {
  let db_connect = dbo.getDb("smarthome");
  db_connect
    .collection("room")
    .find()
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
})

recordRoutes.route("/editroom").post(function (req, res) {
  let db_connect = dbo.getDb("smarthome");
  db_connect
    .collection("room")
    .updateOne( { _id: ObjectId(req.body.id) }, { $set: { name: req.body.name, description: req.body.description}} )
})

recordRoutes.route("/deleteroom").post(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("room")
    .deleteOne( { _id: ObjectId(req.body.id) } )
})

module.exports = recordRoutes;
