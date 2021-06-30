"use strict";

var _mongoose = _interopRequireDefault(require("./services/mongoose"));

var _apis = _interopRequireDefault(require("./apis"));

var _express = _interopRequireDefault(require("./services/express"));

var _config = require("./config");

var _swaggerDocs = require("./services/swaggerDocs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import express from 'express';
// import mongoose from 'mongoose';
// Configuration
// Build Apis Documentation.
//! Get all routes of swagger.
var app = (0, _express["default"])(_apis["default"]);

_mongoose["default"].connect(_config.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true // useCreateIndex: true,

}).then(function () {
  (0, _swaggerDocs.buildSwaggerDocs)(app); // Build swagger docs

  app.listen(_config.port, function () {
    console.log();
    console.log(" \u2705 ".concat(_config.appName, " backend is running"));
    console.log(" \uD83D\uDE80 Server has started ".concat(_config.port, "!! "));
    console.log();
  });
});