"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _mongoose = _interopRequireDefault(require("./services/mongoose"));

var _apis = _interopRequireDefault(require("./apis"));

var _express = _interopRequireDefault(require("./services/express"));

var _config = require("./config");

var _swaggerDocs = require("./services/swaggerDocs");

var scheduler = _interopRequireWildcard(require("./services/scheduler"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    console.log(" \uD83D\uDCDD View Swagger Apis Docs in: ".concat(_config.port).concat(_config.urlBase, "/api-docs"));
    console.log(" \uD83D\uDE80 Server has started ".concat(_config.port, "!! "));
    console.log();
  });

  if (!disableScheduler) {
    scheduler.start();
  }
});

module.exports = app;