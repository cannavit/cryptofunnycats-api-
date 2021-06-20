"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Configuration
//! Get all routes of swagger.
var swaggerSpecs = (0, _swaggerJsdoc["default"])(_config.swaggerOptions);

var withPrefix = function withPrefix(url) {
  return _config.urlBase + url;
};

_mongoose["default"].connect(_config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  var app = (0, _express["default"])();
  app.use(_express["default"].json()); // app.use('/api', routes); // new

  app.use(withPrefix('/smktest'), require('./apis/smktest')); // express swagger routes

  app.use(withPrefix('/api-docs'), _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpecs));
  app.listen(_config.port, function () {
    console.log();
    console.log(" \u2705 ".concat(_config.appName, " backend is running"));
    console.log(" \uD83D\uDE80 Server has started ".concat(_config.port, "!! "));
    console.log();
  });
});