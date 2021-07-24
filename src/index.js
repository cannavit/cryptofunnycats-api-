// import express from 'express';
// import mongoose from 'mongoose';
import mongoose from "./services/mongoose";
import api from "./apis";

import express from "./services/express";
// Configuration
import { port, appName, mongo, urlBase, enableScheduler } from "./config";

// Build Apis Documentation.
import { buildSwaggerDocs } from "./services/swaggerDocs";
import * as scheduler from "./services/scheduler";

import { getCertifiedTemplates } from "./services/collectorSmokeSmells/certifiedTemplates";
//! Get all routes of swagger.

const app = express(api);

mongoose
  .connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    buildSwaggerDocs(app); // Build swagger docs

    app.listen(port, () => {
      console.log();
      console.log(` ✅ ${appName} backend is running`);
      console.log(` 📝 View Swagger Apis Docs in: ${port}${urlBase}/api-docs`);
      console.log(` 🚀 Server has started ${port}!! `);
      console.log();
    });

    if (enableScheduler) {
      scheduler.start();
    }
  });

// Run scheduler files.

// getCertifiedTemplates(); // Load Templates

export default app;

// pm2 start src/index.js  --watch --interpreter babel-node
// pm2 start npm -- run pm2
