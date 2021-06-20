import express from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// Configuration
import { swaggerOptions, port, appName, mongo, urlBase } from './config';

//! Get all routes of swagger.

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

const withPrefix = function (url) {
  return urlBase + url;
};

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
