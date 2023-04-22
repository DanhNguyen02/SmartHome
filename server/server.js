const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const dbo = require('./db/conn');
const mqtt = require('./mqtt/conn');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/record'));
app.use('/auth', require('./routes/authRoutes'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  dbo.connectToServer((err) => {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);

  mqtt.subcribe((err) => {
    if (err) console.error(err);
  });
});
