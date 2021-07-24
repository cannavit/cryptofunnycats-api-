import schedule from "node-schedule";

import { githubSchadulerImportFileshub } from "../../config";
import { runCollectorFilesHub } from "../collectorSmokeSmells/collectFileHubs";

const log = logger.child({ section: "\x1B[0;35mScheduler:\x1B[0m" });

export const start = function () {
  log.info(" 🕕 Scheduler Starting...");

  console.log(">>>>>-1465164694>>>>>");
  console.log(githubSchadulerImportFileshub);
  console.log("<<<<<<<<<<<<<<<<<<<");

  if (githubSchadulerImportFileshub) {
    schedule.scheduleJob("*/32 * * * *", runCollectorFilesHub);
  }

  log.info(" ⏰ ✅ Starting...", "DONE");
};
