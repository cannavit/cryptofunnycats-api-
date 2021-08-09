import mongoose from "./services/mongoose";
import api from "./apis";

import express from "./services/express";

// Configuration
import {
  port,
  appName,
  mongo,
  urlBase,
  enableScheduler,
  gitlabCollectLogs,
} from "./config";

// Build Apis Documentation.
import { buildSwaggerDocs } from "./services/swaggerDocs";
import * as scheduler from "./services/scheduler";

//! Get all routes of swagger.

import { collectProjectInfo } from "./services/gitlabLogsColletor/collector/index";

const app = express(api);

mongoose
  .connect(mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

    // Run scheduler files.
    if (enableScheduler) {
      scheduler.start();
    }
  });

//! Imports files cerfificate from redhat.
// import { getCertifiedTemplates } from "./services/collectorSmokeSmells/certifiedTemplates";
// getCertifiedTemplates(); // Load Templates
//! Imports collects Commits Of Files.
// import { collectCommitsOfFiles } from "./services/collectorSmokeSmells/collectFilesHubCommits";
// collectCommitsOfFiles();
//! Imports collects Commits Of Files V2.
// import { getProjectsUsingFileContent2 } from "./services/collectorSmokeSmells/collectFileHubsV2";
// getProjectsUsingFileContent2();

// Collect logs for gitlab.cl
if (gitlabCollectLogs) {
  collectProjectInfo({
    projectId: "15112024",
  });
}

export default app;

// pm2 start src/index.js  --watch --interpreter babel-node
// pm2 start npm -- run pm2
