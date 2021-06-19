const express = require('express');
const mongoose = require('mongoose');
const routes = require('./apis/smktest'); // new

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import { swaggerOptions, port, appName, mongo } from './config';

//! Get all routes of swagger.

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const withPrefix = function (url) {
  return '/api/v1' + url;
};
// http://localhost:5000/api/v1/api-docs/
mongoose
  .connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();
    app.use(express.json());
    // app.use('/api', routes); // new
    app.use(withPrefix('/smktest'), require('./apis/smktest'));

    // express swagger routes
    app.use(
      withPrefix('/api-docs'),
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpecs)
    );

    app.listen(port, () => {
      console.log();
      console.log(` ✅ ${appName} backend is running`);
      console.log(` 🚀 Server has started ${port}!! `);
      console.log();
    });
  });
