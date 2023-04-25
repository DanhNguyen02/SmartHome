const dbo = require("../db/conn");
const mqtt = require("../mqtt/conn");

module.exports = {
  getTemp: async (req, res) => {
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
  },

  getHumi: async (req, res) => {
    let db_connect = dbo.getDb();
    let devices;
    let feed;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      if (result.rooms[parseInt(req.query.room)] == undefined) {
        return res.status(404).send("Room not found");
      } else {
        devices = result.rooms[parseInt(req.query.room)].devices;
        if (devices.find((x) => x.type === "humi") == undefined) {
          return res.status(404).send("Humi not found");
        } else {
          feed = devices.find((x) => x.type === "humi").feed;
          db_connect
            .collection(feed)
            .find()
            .sort({ _id: -1 })
            .toArray(function (err, result) {
              if (err) return res.status(500).send("Something went wrong!");
              return res.json(result[0]);
            });
        }
      }
    });
  },

  getLight: async (req, res) => {
    let db_connect = dbo.getDb();
    let devices;
    let feed;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      if (result.rooms[parseInt(req.query.room)] == undefined) {
        return res.status(404).send("Room not found");
      } else {
        devices = result.rooms[parseInt(req.query.room)].devices;
        if (devices.find((x) => x.type === "light") == undefined) {
          return res.status(404).send("Light not found");
        } else {
          feed = devices.find((x) => x.type === "light").feed;
          db_connect
            .collection(feed)
            .find()
            .sort({ _id: -1 })
            .toArray(function (err, result) {
              if (err) return res.status(500).send("Something went wrong!");
              return res.json(result[0]);
            });
        }
      }
    });
  },

  postLight: async (req, res) => {
    mqtt.publish(req.body.topic, req.body.data);
    return res.json({ data: req.body.data });
  },

  getFan: async (req, res) => {
    let db_connect = dbo.getDb();
    let devices;
    let feed;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      if (result.rooms[parseInt(req.query.room)] == undefined) {
        return res.status(404).send("Room not found");
      } else {
        devices = result.rooms[parseInt(req.query.room)].devices;
        if (devices.find((x) => x.type === "fan") == undefined) {
          return res.status(404).send("Fan not found");
        } else {
          feed = devices.find((x) => x.type === "fan").feed;
          db_connect
            .collection(feed)
            .find()
            .sort({ _id: -1 })
            .toArray(function (err, result) {
              if (err) return res.status(500).send("Something went wrong!");
              return res.json(result[0]);
            });
        }
      }
    });
  },

  postFan: async (req, res) => {
    mqtt.publish(req.body.topic, req.body.data);
    return res.json({ data: req.body.data });
  },

  getRooms: async (req, res) => {
    let db_connect = dbo.getDb();
    let rooms;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      rooms = result.rooms;
      return res.json(rooms);
    });
  },

  postRoom: async (req, res) => {
    let db_connect = dbo.getDb();
    let newRoom = {
      name: req.body.name,
      desc: req.body.desc,
      devices: [],
    };
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      for (let room of rooms) {
        if (newRoom.name == room.name)
          return res.status(500).send("The room name already exists");
      }

      rooms.push(newRoom);
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
      return res
        .status(200)
        .json({ message: "Room has been added", rooms: rooms });
    });
  },

  putRoom: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      if (rooms[parseInt(req.body.room)] === undefined) {
        return res.status(404).send("Room not found");
      } else {
        let newRoom = {
          ...rooms[parseInt(req.body.room)],
          name: req.body.name,
          desc: req.body.desc,
        };
        for (let room of rooms) {
          if (newRoom.name == room.name)
            return res.status(500).send("The room name already exists");
        }
        rooms[parseInt(req.body.room)] = newRoom;
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
        return res
          .status(200)
          .json({ message: "Room has been updated", rooms: rooms });
      }
    });
  },

  deleteRoom: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      rooms.splice(parseInt(req.body.room), 1);
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
      return res
        .status(200)
        .json({ message: "Room has been deleted", rooms: rooms });
    });
  },

  getDevices: async (req, res) => {
    let db_connect = dbo.getDb();
    let devices;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      if (result.rooms[parseInt(req.query.room)] == undefined) {
        return res.status(404).send("Room not found");
      } else {
        devices = result.rooms[parseInt(req.query.room)].devices;
        return res.json(devices);
      }
    });
  },

  postDevice: async (req, res) => {
    let db_connect = dbo.getDb();
    let newDevice = {
      name: req.body.name,
      feed: req.body.feed,
      type: req.body.type,
      min: req.body.min,
      max: req.body.max,
    };
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      if (rooms[parseInt(req.body.room)] === undefined) {
        return res.status(404).send("Room not found");
      } else {
        let devices = rooms[parseInt(req.body.room)].devices;
        for (let device of devices) {
          if (newDevice.name == device.name)
            return res.status(500).send("The device name already exists");
        }
        rooms[parseInt(req.body.room)].devices.push(newDevice);
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
        return res.status(200).json({
          message: "Device has been added",
          devices: rooms[parseInt(req.body.room)].devices,
        });
      }
    });
  },

  putDevice: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      let newDevice = {
        name: req.body.name,
        feed: req.body.feed,
        type: req.body.type,
        min: req.body.min,
        max: req.body.max,
      };
      if (rooms[parseInt(req.body.room)] === undefined) {
        return res.status(404).send("Room not found");
      } else {
        let devices = rooms[parseInt(req.body.room)].devices;
        if (parseInt(req.body.device) >= devices.length)
          return res.status(404).send("Device not found");
        for (let i in devices) {
          if (
            newDevice.name == devices[i].name &&
            i != parseInt(req.body.device)
          )
            return res.status(500).send("The device name already exists");
        }
        rooms[parseInt(req.body.room)].devices[parseInt(req.body.device)] =
          newDevice;
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
        return res.status(200).json({
          message: "Device has been updated",
          devices: rooms[parseInt(req.body.room)].devices,
        });
      }
    });
  },

  deleteDevice: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let rooms = result.rooms;
      if (rooms[parseInt(req.body.room)] === undefined) {
        return res.status(404).send("Room not found");
      } else {
        rooms[parseInt(req.body.room)].devices.splice(
          parseInt(req.body.device),
          1
        );
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { rooms: rooms } });
        return res.status(200).json({
          message: "Device has been deleted",
          devices: rooms[parseInt(req.body.room)].devices,
        });
      }
    });
  },

  getData: async (req, res) => {
    let db_connect = dbo.getDb();
    let devices;
    let feed;
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      if (result.rooms[parseInt(req.query.room)] == undefined) {
        return res.status(404).send("Room not found");
      } else {
        devices = result.rooms[parseInt(req.query.room)].devices;
        if (devices[parseInt(req.query.device)] == undefined) {
          return res.status(404).send("Device not found");
        } else {
          feed = devices[parseInt(req.query.device)].feed;
          db_connect
            .collection(feed)
            .find()
            .sort({ _id: -1 })
            .toArray(function (err, result) {
              if (err) res.status(500).send("Something went wrong!");
              return res.json(result);
            });
        }
      }
    });
  },

  getNoti: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      noti = result.noti;
      return res.json(noti);
    });
  },

  postNoti: async (req, res) => {
    let db_connect = dbo.getDb();
    let newNoti = {
      time: new Date().toLocaleString(),
      room: req.body.room,
      device: req.body.device,
      data: req.body.data,
    };
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      const io = req.io;
      let noti = result.noti;
      noti.push(newNoti);
      db_connect
        .collection("user")
        .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
      io.emit("newNoti", "Notification received");
      return res
        .status(200)
        .json({ message: "Notification has been added", noti: noti });
    });
  },

  putNoti: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let noti = result.noti;
      if (noti[parseInt(req.body.noti)] === undefined) {
        return res.status(404).send("Notification not found");
      } else {
        let newNoti = {
          ...noti[parseInt(req.body.noti)],
          status: req.body.status,
        };
        noti[parseInt(req.body.noti)] = newNoti;
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
        return res
          .status(200)
          .json({ message: "Notification has been updated", noti: noti });
      }
    });
  },

  deleteNoti: async (req, res) => {
    let db_connect = dbo.getDb();
    db_connect.collection("user").findOne({}, function (err, result) {
      if (err) return res.status(500).send("Something went wrong!");
      let noti = result.noti;
      if (noti[parseInt(req.body.noti)] === undefined) {
        return res.status(404).send("Notification not found");
      } else {
        noti.splice(parseInt(req.body.noti), 1);
        db_connect
          .collection("user")
          .updateOne({ email: "test@gmail.com" }, { $set: { noti: noti } });
        return res
          .status(200)
          .json({ message: "Notification has been deleted", noti: noti });
      }
    });
  },
};
