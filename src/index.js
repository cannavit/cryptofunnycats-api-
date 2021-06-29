// import express from 'express';
import mongoose from 'mongoose';
import api from './apis';
import express from './services/express';

// Configuration
import { port, appName, mongo, urlBase } from './config';

// Build Apis Documentation. 
import {buildSwaggerDocs} from './services/swaggerDocs'


//! Get all routes of swagger.

const app = express(api);



mongoose
  .connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {

  buildSwaggerDocs(app) // Build swagger docs

    app.listen(port, () => {
      console.log();
      console.log(` ✅ ${appName} backend is running`);
      console.log(` 🚀 Server has started ${port}!! `);
      console.log();
    });
  });
