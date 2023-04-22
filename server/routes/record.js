const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");
const mqtt = require("../mqtt/conn");

const ObjectId = require("mongodb").ObjectId;

/**
 * @swagger
 * tags:
 *   name: Temp
 *   description: API endpoints for get latest temperature data
 */

/**
 * @swagger
 * /api/temp:
 *   get:
 *     summary: Get the latest temperature data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get temperature's data
 *         required: true
 *         type: string
 *     tags: [Temp]
 *     responses:
 *       200:
 *         description: The latest data of temperature
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/temp").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      if (devices.find((x) => x.type === "temp") == undefined) {
        res.status(404).send("Temp not found");
      } else {
        feed = devices.find((x) => x.type === "temp").feed;
        db_connect
          .collection(feed)
          .find()
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) throw err;
            res.json(result[0]);
          });
      }
    }
  });
});

/**
 * @swagger
 * tags:
 *   name: Humi
 *   description: API endpoints for get latest humidity data
 */

/**
 * @swagger
 * /api/humi:
 *   get:
 *     summary: Get the latest humidity data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get humidity's data
 *         required: true
 *         type: string
 *     tags: [Humi]
 *     responses:
 *       200:
 *         description: The latest data of humidity
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/humi").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      if (devices.find((x) => x.type === "humi") == undefined) {
        res.status(404).send("Humi not found");
      } else {
        feed = devices.find((x) => x.type === "humi").feed;
        db_connect
          .collection(feed)
          .find()
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) throw err;
            res.json(result[0]);
          });
      }
    }
  });
});

/**
 * @swagger
 * tags:
 *   name: Light
 *   description: API endpoints for get latest light data
 */

/**
 * @swagger
 * /api/light:
 *   get:
 *     summary: Get the latest light data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get light's data
 *         required: true
 *         type: string
 *     tags: [Light]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room/Light not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add light's data to adafruit server
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Topic and data to send to adafruit server
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            topic:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Light]
 *     responses:
 *       200:
 *         description: Data has been add to adafruit server
 */

recordRoutes.route("/light").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      if (devices.find((x) => x.type === "light") == undefined) {
        res.status(404).send("Light not found");
      } else {
        feed = devices.find((x) => x.type === "light").feed;
        db_connect
          .collection(feed)
          .find()
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) throw err;
            res.json(result[0]);
          });
      }
    }
  });
});

recordRoutes.route("/light").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

/**
 * @swagger
 * tags:
 *   name: Fan
 *   description: API endpoints for get latest fan data
 */

/**
 * @swagger
 * /api/fan:
 *   get:
 *     summary: Get the latest fan data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get fan's data
 *         required: true
 *         type: string
 *     tags: [Fan]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add fan's data to adafruit server
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Topic and data to send to adafruit server
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            topic:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Fan]
 *     responses:
 *       200:
 *         description: Data has been add to adafruit server
 */

recordRoutes.route("/fan").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      if (devices.find((x) => x.type === "fan") == undefined) {
        res.status(404).send("Fan not found");
      } else {
        feed = devices.find((x) => x.type === "fan").feed;
        db_connect
          .collection(feed)
          .find()
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) throw err;
            res.json(result[0]);
          });
      }
    }
  });
});

recordRoutes.route("/fan").post(function (req, response) {
  mqtt.publish(req.body.topic, req.body.data);
  response.json({ data: req.body.data });
});

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints for get list of room
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get a list of rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A list of rooms
 */

recordRoutes.route("/rooms").get(function (req, res) {
  let db_connect = dbo.getDb();
  let rooms;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    rooms = result.rooms;
    res.json(rooms);
  });
});

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: API endpoints for manage room
 */

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Add new room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room's data to add
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            desc:
 *              type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: The latest data of light
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and room's data to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            name:
 *              type: string
 *            desc:
 *              type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Room has been updated
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Room has been updated
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/room").post(function (req, res) {
  let db_connect = dbo.getDb();
  let room = {
    name: req.body.name,
    desc: req.body.desc,
    devices: [],
  };
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
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
    if (err) res.status(500).send("Something went wrong!");
    let rooms = result.rooms;
    if (rooms[parseInt(req.body.room)] === undefined) {
      res.status(404).send("Room not found");
    } else {
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
    }
  });
});

recordRoutes.route("/room").delete(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let rooms = result.rooms;
    rooms.splice(parseInt(req.body.room), 1);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
    res.status(200).json({ message: "Room has been deleted" });
  });
});

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API endpoints for get list of devices
 */

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Get a list of devices
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room for get devices
 *         required: true
 *         type: string
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: A list of devices
 */

recordRoutes.route("/devices").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      res.json(devices);
    }
  });
});

/**
 * @swagger
 * tags:
 *   name: Device
 *   description: API endpoints for manage device
 */

/**
 * @swagger
 * /api/device:
 *   post:
 *     summary: Add new device to room
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and device's data to add
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            name:
 *              type: string
 *            feed:
 *              type: string
 *            type:
 *              type: string
 *            min:
 *              type: string
 *            max:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been added
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update device
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index, device index and device's data to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *            name:
 *              type: string
 *            feed:
 *              type: string
 *            type:
 *              type: string
 *            min:
 *              type: string
 *            max:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been updated
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete device
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room index and device index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *     tags: [Device]
 *     responses:
 *       200:
 *         description: Device has been deleted
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/device").post(function (req, res) {
  const io = req.io;
  let db_connect = dbo.getDb();
  let device = {
    name: req.body.name,
    feed: req.body.feed,
    type: req.body.type,
    min: req.body.min,
    max: req.body.max,
  };
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let rooms = result.rooms;
    if (rooms[parseInt(req.body.room)] === undefined) {
      res.status(404).send("Room not found");
    } else {
      rooms[parseInt(req.body.room)].devices.push(device);
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
      res.status(200).json({ message: "Device has been added" });
    }
  });
});

recordRoutes.route("/device").put(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let rooms = result.rooms;
    let newDevice = {
      name: req.body.name,
      feed: req.body.feed,
      type: req.body.type,
      min: req.body.min,
      max: req.body.max,
    };
    if (rooms[parseInt(req.body.room)] === undefined) {
      res.status(404).send("Room not found");
    } else {
      rooms[parseInt(req.body.room)].devices[parseInt(req.body.device)] =
        newDevice;
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
      res.status(200).json({ message: "Device has been updated" });
    }
  });
});

recordRoutes.route("/device").delete(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let rooms = result.rooms;
    if (rooms[parseInt(req.body.room)] === undefined) {
      res.status(404).send("Room not found");
    } else {
      rooms[parseInt(req.body.room)].devices.splice(
        parseInt(req.body.device),
        1
      );
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
      res.status(200).json({ message: "Device has been deleted" });
    }
  });
});

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: API endpoints for get list of data
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get a list of data
 *     parameters:
 *       - in: query
 *         name: room
 *         description: Room of a device to get data
 *         required: true
 *         type: string
 *       - in: query
 *         name: device
 *         description: Device to get data
 *         required: true
 *         type: string
 *     tags: [Data]
 *     responses:
 *       200:
 *         description: A list of data
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/data").get(function (req, res) {
  let db_connect = dbo.getDb();
  let devices;
  let feed;
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    if (result.rooms[parseInt(req.query.room)] == undefined) {
      res.status(404).send("Room not found");
    } else {
      devices = result.rooms[parseInt(req.query.room)].devices;
      if (devices[parseInt(req.query.device)] == undefined) {
        res.status(404).send("Device not found");
      } else {
        feed = devices[parseInt(req.query.device)].feed;
        db_connect
          .collection(feed)
          .find()
          .sort({ _id: -1 })
          .toArray(function (err, result) {
            if (err) res.status(500).send("Something went wrong!");
            res.json(result);
          });
      }
    }
  });
});

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: API endpoints for get list of notification
 */

/**
 * @swagger
 * /api/noti:
 *   get:
 *     summary: Get a list of notifications
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: A list of notifications
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Add new notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Room, device and data need to notice
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            room:
 *              type: string
 *            device:
 *              type: string
 *            data:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Device has been added
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Notification index to update
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            noti:
 *              type: string
 *            status:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Device has been updated
 *       404:
 *         description: Room/Device not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete notification
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Notification index to delete
 *         required: true
 *         schema:
 *          type: object
 *          properties:
 *            noti:
 *              type: string
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: Notification has been deleted
 *       500:
 *         description: Internal server error
 */

recordRoutes.route("/noti").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    noti = result.noti;
    res.json(noti);
  });
});

recordRoutes.route("/noti").post(function (req, res) {
  let db_connect = dbo.getDb();
  let newNoti = {
    time: new Date().toLocaleString(),
    room: req.body.room,
    device: req.body.device,
    data: req.body.data,
  };
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let noti = result.noti;
    noti.push(newNoti);
    db_connect
      .collection("user")
      .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
    res.status(200).json({ message: "Notification has been added" });
  });
});

recordRoutes.route("/noti").put(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let noti = result.noti;
    if (noti[parseInt(req.body.noti)] === undefined) {
      res.status(404).send("Notification not found");
    } else {
      let newNoti = {
        ...noti[parseInt(req.body.noti)],
        status: req.body.status,
      };
      noti[parseInt(req.body.noti)] = newNoti;
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
      res.status(200).json({ message: "Notification has been updated" });
    }
  });
});

recordRoutes.route("/noti").delete(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect.collection("user").findOne({}, function (err, result) {
    if (err) res.status(500).send("Something went wrong!");
    let noti = result.noti;
    if (noti[parseInt(req.body.noti)] === undefined) {
      res.status(404).send("Notification not found");
    } else {
      noti.splice(parseInt(req.body.noti), 1);
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
      res.status(200).json({ message: "Notification has been deleted" });
    }
  });
});

module.exports = recordRoutes;
