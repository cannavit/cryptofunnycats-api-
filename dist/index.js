"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("./services/mongoose"));

var _apis = _interopRequireDefault(require("./apis"));

var _express = _interopRequireDefault(require("./services/express"));

var _config = require("./config");

var _swaggerDocs = require("./services/swaggerDocs");

var _collectFileHubs = require("./services/collectorSmokeSmells/collectFileHubs");

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
}); // Run scheduler files.


console.log(">>>>>117991420>>>>>");

function test() {
  return _test.apply(this, arguments);
}

function _test() {
  _test = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("@1Marker-No:_354467327");
            _context.next = 3;
            return (0, _collectFileHubs.getProjectsUsingFileContent)();

          case 3:
            return _context.abrupt("return");

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _test.apply(this, arguments);
}

test();
console.log("<<<<<<<<<<<<<<<<<<<");
var _default = app;
exports["default"] = _default;