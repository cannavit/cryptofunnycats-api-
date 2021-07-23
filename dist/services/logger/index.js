"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.expressErrorLogger = exports.expressLogger = void 0;

var _winston = _interopRequireWildcard(require("winston"));

var _expressWinston = _interopRequireDefault(require("express-winston"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_winston["default"].configure({
  transports: [new _winston.transports.Console({
    level: process.env.LOG_LEVEL || 'info',
    colorize: true,
    timestamp: true,
    format: _winston.format.combine(_winston.format.errors({
      stack: true
    }), _winston.format.timestamp(), _winston.format.colorize(), _winston.format.metadata(), _winston.format.printf(function (info) {
      return "".concat(info.metadata.timestamp, " ").concat(info.level, ":").concat(info.metadata.section ? " ".concat(info.metadata.section) : '', " ").concat(_.isString(info.message) ? info.message : JSON.stringify(info.message), ". ").concat(info.metadata.stack ? '\n' + info.metadata.stack : '');
    }))
  })]
});

_winston["default"]._odinError = _winston["default"].error;

_winston["default"].error = function (err) {
  if (err instanceof Error) {
    _winston["default"]._odinError(JSON.stringify(err.message), err);
  } else {
    _winston["default"]._odinError(err);
  }
};

var expressLogger = _expressWinston["default"].logger({
  winstonInstance: _winston["default"],
  // TODO: log errors explicitly
  msg: '{{req.method}} {{res.statusCode}} {{res.responseTime}}ms user:{{req.user?req.user._id:"Anonymous"}} {{req.url.split("?")[0]}}',
  colorize: true
});

exports.expressLogger = expressLogger;

var expressErrorLogger = _expressWinston["default"].errorLogger({
  winstonInstance: _winston["default"],
  // TODO: log errors explicitly
  msg: '{{req.method}} {{res.statusCode}} {{res.responseTime}}ms user:{{req.user?req.user._id:"Anonymous"}} {{req.url.split("?")[0]}} body:{{JSON.stringify(req.body)}}',
  colorize: true,
  meta: false
});

exports.expressErrorLogger = expressErrorLogger;
var _default = _winston["default"];
exports["default"] = _default;