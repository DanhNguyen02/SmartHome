const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require('cors');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const dbo = require('./db/conn');
const mqtt = require('./mqtt/conn');

const socketIo = require("socket.io")(server, {
  cors: {
      origin: "*",
  }
});

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.emit("getId", socket.id);

  socket.on("sendDataClient", function(data) {
    console.log(data)
    socketIo.emit("sendDataServer", { data });
  })

  socket.on("deviceChanged", function(data) {
    console.log(data)
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((req, res, next) => {
  req.io = socketIo;
  next();
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require("./routes/record"));
app.use("/auth", require("./routes/authRoutes"));


// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Smart home API",
    version: "1.0.0",
    description: "An example API for demonstration purposes",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Smart home server",
    },
  ],
};

// Options for the Swagger docs
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to the API docs
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);

  mqtt.subcribe((err) => {
    if (err) console.error(err);
  });
});
