"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _config = require("../../config");

var _collectFileHubs = require("../collectorSmokeSmells/collectFileHubs");

var _collectFileHubsV = require("../collectorSmokeSmells/collectFileHubsV2");

(0, _collectFileHubsV.getProjectsUsingFileContent2)();
var log = logger.child({
  section: "\x1B[0;35mScheduler:\x1B[0m"
});

var start = function start() {
  log.info(" 🕕 Scheduler Starting...");

  if (_config.githubSchadulerImportFileshub) {
    _nodeSchedule["default"].scheduleJob("*/5 * * * *", _collectFileHubsV.getProjectsUsingFileContent2);
  }

  log.info(" ⏰ ✅ Starting...", "DONE");
};

exports.start = start;