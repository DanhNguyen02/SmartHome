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
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    devices = result.rooms[parseInt(req.body.room)].devices;
    feed = devices.find((x) => x.type === "temp").feed;
    db_connect
      .collection(feed)
      .find()
      .sort({ _id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result[0]);
      });
  });
});

// This section will help you get a humi of current.
recordRoutes.route("/humi").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    devices = result.rooms[parseInt(req.body.room)].devices;
    feed = devices.find((x) => x.type === "humi").feed;
    db_connect
      .collection(feed)
      .find()
      .sort({ _id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result[0]);
      });
  });
});

recordRoutes.route("/light").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

recordRoutes.route("/fan").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

recordRoutes.route("/rooms").get(function (req, res) {
  let db_connect = dbo.getDb();
  let rooms;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    rooms = result.rooms;
    res.json(rooms);
  });
});

recordRoutes.route("/room").post(function (req, res) {
  let db_connect = dbo.getDb();
  let room = {
    name: req.body.name,
    desc: req.body.desc,
    devices: [],
  };
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    rooms.push(room);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Room has been added" });
  });
});

recordRoutes.route("/room").put(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    let newRoom = {
      ...rooms[parseInt(req.body.room)],
      name: req.body.name,
      desc: req.body.desc,
    };
    rooms[parseInt(req.body.room)] = newRoom;
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Room has been updated" });
  });
});

recordRoutes.route("/room").delete(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    rooms.splice(parseInt(req.body.room), 1);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Room has been deleted" });
  });
});

recordRoutes.route("/devices").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    devices = result.rooms[parseInt(req.query.room)].devices;
    res.json(devices);
  });
});

recordRoutes.route("/device").post(function (req, res) {
  let db_connect = dbo.getDb();
  let device = {
    name: req.body.name,
    feed: req.body.feed,
    type: req.body.type,
    min: req.body.min,
    max: req.body.max,
  };
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    rooms[parseInt(req.body.room)].devices.push(device);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Device has been added" });
  });
});

recordRoutes.route("/device").put(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    let newDevice = {
      name: req.body.name,
      feed: req.body.feed,
      type: req.body.type,
      min: req.body.min,
      max: req.body.max,
    };
    rooms[parseInt(req.body.room)].devices[parseInt(req.body.device)] =
      newDevice;
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Device has been updated" });
  });
});

recordRoutes.route("/device").delete(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    let rooms = result.rooms;
    rooms[parseInt(req.body.room)].devices.splice(parseInt(req.body.device), 1);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Device has been deleted" });
  });
});

recordRoutes.route("/data").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) throw err;
    devices = result.rooms[parseInt(req.query.room)].devices;
    feed = devices[parseInt(req.query.device)].feed;
    db_connect
      .collection(feed)
      .find()
      .sort({ _id: -1 })
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
  });
});

module.exports = recordRoutes;
