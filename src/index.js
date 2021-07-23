// import express from 'express';
// import mongoose from 'mongoose';
import mongoose from "./services/mongoose";
import api from "./apis";

import express from "./services/express";
// Configuration
import { port, appName, mongo, urlBase } from "./config";

// Build Apis Documentation.
import { buildSwaggerDocs } from "./services/swaggerDocs";

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
  });

// Run scheduler files.
import { getProjectsUsingFileContent } from "./services/collectorSmokeSmells/collectFileHubs";

console.log(">>>>>117991420>>>>>");

async function test() {
  console.log("@1Marker-No:_354467327");

  await getProjectsUsingFileContent();
  return;
}

test();
console.log("<<<<<<<<<<<<<<<<<<<");

export default app;
