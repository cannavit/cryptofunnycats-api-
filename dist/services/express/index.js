"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chocomen = require("@becodebg/chocomen");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _expressForceSsl = _interopRequireDefault(require("express-force-ssl"));

var _querymen = require("querymen");

var _config = require("../../config");

var _logger = _interopRequireWildcard(require("../logger"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var withPrefix = function withPrefix(url) {
  return _config.urlBase + url;
};

var _default = function _default(routes) {
  var app = (0, _express["default"])();
  /* istanbul ignore next */

  if (_config.env === 'production' && _config.expressSSLRedirect) {
    _logger["default"].info('\x1B[0;34mExpress:\x1B[0m SSL redirect is ENABLED');

    app.set('forceSSLOptions', {
      enable301Redirects: false,
      trustXFPHeader: true
    });
    app.use(_expressForceSsl["default"]);
  } else {
    _logger["default"].info('\x1B[0;34mExpress:\x1B[0m SSL redirect is DISABLED');
  }
  /* istanbul ignore next */


  if (_config.env === 'production' || _config.env === 'development') {
    app.use((0, _cors["default"])());
    app.use((0, _compression["default"])());
    app.use(_logger.expressLogger);
  }

  app.use(_bodyParser["default"].urlencoded({
    extended: false
  }));
  app.use(_bodyParser["default"].json());
  app.use(routes);
  app.use(_logger.expressErrorLogger);
  app.use((0, _querymen.errorHandler)());
  app.use((0, _chocomen.errorHandler)());
  app.use(genericErrorHandler);
  return app;
};
/* eslint-disable no-unused-vars */


exports["default"] = _default;

var genericErrorHandler = function genericErrorHandler(err, req, res, next) {
  _logger["default"].error(err);

  if (req.querymen && req.querymen.error) {
    res.status(400).json({
      error: req.querymen.error
    });
  } else if (req.bodymen && req.bodymen.error) {
    res.status(400).json({
      error: req.bodymen.error
    });
  } else if (err.errors) {
    // mongoose validation
    res.status(400).json({
      error: {
        valid: false,
        param: Object.keys(err.errors).join(','),
        message: err.message
      }
    });
  } else {
    res.status(400).json({
      error: err.message ? err.message : err
    });
  }
};