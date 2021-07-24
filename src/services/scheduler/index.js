import schedule from "node-schedule";

import { githubSchadulerImportFileshub } from "../../config";
import { runCollectorFilesHub } from "../collectorSmokeSmells/collectFileHubs";

const log = logger.child({ section: "\x1B[0;35mScheduler:\x1B[0m" });

export const start = function () {
  log.info(" 🕕 Scheduler Starting...");

  if (githubSchadulerImportFileshub) {
    schedule.scheduleJob("*/10 1 * * *", runCollectorFilesHub);
  }

  log.info(" ⏰ ✅ Starting...", "DONE");
};
