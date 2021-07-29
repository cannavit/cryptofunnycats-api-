import schedule from "node-schedule";

import { githubSchadulerImportFileshub } from "../../config";
import { runCollectorFilesHub } from "../collectorSmokeSmells/collectFileHubs";
import { getProjectsUsingFileContent2 } from "../collectorSmokeSmells/collectFileHubsV2";
getProjectsUsingFileContent2();
const log = logger.child({ section: "\x1B[0;35mScheduler:\x1B[0m" });

export const start = function () {
  log.info(" 🕕 Scheduler Starting...");

  if (githubSchadulerImportFileshub) {
    schedule.scheduleJob("*/5 * * * *", getProjectsUsingFileContent2);
  }

  log.info(" ⏰ ✅ Starting...", "DONE");
};
