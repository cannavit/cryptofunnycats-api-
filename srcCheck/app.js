import http from 'http';
import api from './api';
import { disableScheduler, env, ip, mongo, port } from './config';
import express from './services/express';
import mongoose from './services/mongoose';
import * as scheduler from './services/scheduler';
import socketIO from './services/socket.io';

const app = express(api);
const server = http.createServer(app);

mongoose.connect(mongo.uri, { useNewUrlParser: true });
socketIO.init(server);
setImmediate(() => {
  server.listen(port, ip, () => {
    logger.info(
      `\x1B[0;34mExpress:\x1B[0m Server listening on http://${ip}:${port}, in ${env} mode`
    );
  });
  if (!disableScheduler) {
    scheduler.start();
  }
});

// export default app;
// const express = require('express');
// const app = express('');

// app.use(express.json());
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(process.env.PORT || 5000, () => console.log('Up and running 🚀'));

// const express = require('express');
// const mongoose = require('mongoose'); // new

// models/Post.js

// module.exports = mongoose.model("Post", schema)

// routes.js

// const express = require("express")
// const router = express.Router()

// module.exports = router
// Connect to MongoDB database
// mongoose
//   .connect('mongodb://27.0.0.1:27017/messe-server-localhost', {
//     useNewUrlParser: true,
//   })
//   .then(() => {
//     const app = express(api);

//     app.listen(5000, () => {
//       console.log('Server has started!');
//     });
//   });
