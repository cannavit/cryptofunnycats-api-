"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _api = _interopRequireDefault(require("./api"));

var _config = require("./config");

var _express = _interopRequireDefault(require("./services/express"));

var _mongoose = _interopRequireDefault(require("./services/mongoose"));

var _socket = _interopRequireDefault(require("./services/socket.io"));

var scheduler = _interopRequireWildcard(require("./services/scheduler"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(_api["default"]);

var server = _http["default"].createServer(app);

_mongoose["default"].connect(_config.mongo.uri, {
  useNewUrlParser: true
});

_socket["default"].init(server);

setImmediate(function () {
  server.listen(_config.port, _config.ip, function () {
    logger.info("\x1B[0;34mExpress:\x1B[0m Server listening on http://".concat(_config.ip, ":").concat(_config.port, ", in ").concat(_config.env, " mode"));
  });

  if (!_config.disableScheduler) {
    scheduler.start();
  }
});
var _default = app;
exports["default"] = _default;