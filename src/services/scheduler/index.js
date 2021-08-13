import schedule from "node-schedule";

import {
  githubSchadulerImportFileshub,
  gitlabCollectLogsPublics,
  gitlabBearerToken,
} from "../../config";

import { collectAllProject } from "../../services/gitlabLogsColletor/collector/index";

// /services/gitlabLogsColletor/collector/index"
// import { runCollectorFilesHub } from "../collectorSmokeSmells/collectFileHubs";
// import { getProjectsUsingFileContent2 } from "../collectorSmokeSmells/collectFileHubsV2";
const log = logger.child({ section: "\x1B[0;35mScheduler:\x1B[0m" });

export const start = function () {
  log.info(" 🕕 Scheduler Starting...");

  if (githubSchadulerImportFileshub) {
    // schedule.scheduleJob("*/5 * * * *", getProjectsUsingFileContent2);
  }

  let options = {
    bearerToken: gitlabBearerToken,
  };

  if (gitlabCollectLogsPublics) {
    schedule.scheduleJob("*/1 * * * *", collectAllProject(options));
  }

  log.info(" ⏰ ✅ Starting...", "DONE");
};
