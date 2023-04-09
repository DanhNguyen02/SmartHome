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
  subcribe: function (callback) {
    const topics = [
      "haiche198/feeds/yolo-led",
      "haiche198/feeds/yolo-fan",
      "haiche198/feeds/yolo-humi",
      "haiche198/feeds/yolo-temp",
    ];
    client.on("connect", () => {
      console.log("Connected");
      for (let topic of topics) {
        client.subscribe([topic], () => {
          console.log(`Subscribe to topic '${topic}'`);
        });
      }
    });
    client.on("message", (topic, message) => {
      console.log("Received Message:", topic, message.toString());
      var messageObject = {
        time: new Date().toLocaleString(),
        message: message.toString(),
      };
      let db_connect = dbo.getDb();
      db_connect
        .collection(topic.substring(topic.lastIndexOf("/") + 1))
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
