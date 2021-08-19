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
  gitlabCollectLogsPublics,
  bearerToken,
} from "./config";

// Build Apis Documentation.
import { buildSwaggerDocs } from "./services/swaggerDocs";
import * as scheduler from "./services/scheduler";

//! Get all routes of swagger.

import {
  collectProjectInfo,
  collectAllProject,
} from "./services/gitlabLogsColletor/collector/index";

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

let options = {
  bearerToken: bearerToken,
};
//! Collect logs for gitlab.cl private projects
if (gitlabCollectLogs) {
  console.log("@1Marker-No:_-2107073053");
  //! Anoki
  let importProjectsList = [
    // "15112024", // edutelling-api
    // "15794568", // edutelling-app
    // "13390016", // ckp-api
    // "13177865", // TRusT-FE
    // "23449559", // app-prenotazioni-api
    // "11018055", // POT-api
    // "26278209", // pax-Italia-pot-cicd
    // "13680394", // trust-mail-sender
    // "27569851", // smoke-collector
  ];
  //! Publics
  //? https://gitlab.com/explore?sort=stars_desc&visibility_level=20
  console.log("@1Marker-No:_1822266173");
  importProjectsList = [
    // "278964",  // GitLab 3006
    // "3472737", // inkscape 2237
    // "250833",  // gitlab-runner 1856
    // "6853087", // HomelabOS 941
    // "6922885", // AuroraStore 922
    // "3199253", // quart 848
    // "3601513", // webapp 812
    // "7603319", // Meltano 520
    // "2977308", // GitFox 441
    // "6814019", // manyverse
    // "6821549", // ClearURLs
    // "2712276", // Dropzone
    // "4180516", // Antora
    // "6412021", // hypercorn
    // "7301016", // pmbootstrap
    // "3682068", // babel-preset-php
    "10582521", // OpenRGB
    "473568", // LabCoat
    "10382875", // Dotfiles
    "10858056", // Baserow
    "36528", // Data
    "6094330", // Commento
    "4815250", // mutt
    "5261717", // gitlab-vscode-extension
    "3828396", //GitLab Chart
    "2009901", // gitaly
    "8320003", // news_flash_gtk
    "4469613", // sequoia
    "5664378", // ffsend
    "GnuTLS", // GnuTLS
    "6977506", // prismo
    "24091344", // Jam
    "8229519", // AutowareAuto
  ];
  for (const projectId of importProjectsList) {
    collectProjectInfo({
      projectId: projectId,
    });
  }
}

// if (gitlabCollectLogsPublics) {
//   collectAllProject(options);
// }

export default app;

// pm2 start src/index.js  --watch --interpreter babel-node
// pm2 start npm -- run pm2
