const mqtt = require("mqtt");
const dbo = require("../db/conn");

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
const connectUrl = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_IOKEY,
  reconnectPeriod: 1000,
});

module.exports = {
  subcribe: function (callback, socketIo) {
    const topics = [
      "haiche198/feeds/yolo-led",
      "haiche198/feeds/yolo-fan",
      "haiche198/feeds/yolo-humi",
      "haiche198/feeds/yolo-temp",
    ];
    client.on("connect", () => {
      for (let topic of topics) {
        client.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`);
        });
      }
    });
    client.on("message", (topic, message) => {
      console.log("Received Message:", topic, message.toString());

      let db_connect = dbo.getDb();

      // Kiem tra nguong
      db_connect.collection("user").findOne({}, function (err, result) {
        if (err) throw err;
        let rooms = result.rooms;
        for (let room of rooms) {
          for (let device of room.devices) {
            if (device.feed == topic) {
              if (
                parseFloat(message) > parseFloat(device.max) ||
                parseFloat(message) < parseFloat(device.min)
              ) {
                let newNoti = {
                  time: new Date().toLocaleString(),
                  room: room.name,
                  device: device.name,
                  type: device.type,
                  data: message.toString(),
                };
                db_connect
                  .collection("user")
                  .findOne({}, function (err, result) {
                    if (err) throw err;
                    let noti = result.noti;
                    noti.push(newNoti);
                    db_connect
                      .collection("user")
                      .updateOne(
                        { email: "test@gmail.com" },
                        { $set: { noti: noti } },
                        function (err, result) {
                          if (err) throw err;
                          socketIo.emit("newNoti", "Received notification");
                        }
                      );
                  });
              }
            }
          }
        }
      });

      var messageObject = {
        time: new Date().toLocaleString(),
        message: message.toString(),
      };

      db_connect
        .collection(topic)
        .insertOne(messageObject, function (err, res) {
          if (err) throw err;
        });
    });
  },

  publish: function (topic, data) {
    client.publish(topic, data, { qos: 0, retain: false }, (error) => {
      console.log("Published to topic " + topic + " data: " + data);
      if (error) {
        console.error(error);
      }
    });
  },
};
