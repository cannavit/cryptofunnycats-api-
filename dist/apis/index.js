"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _config = require("../config");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = new _express.Router();
/**
 * Generate API routes based on folders
 *  (exclude folder starting with '_')
 */

var swaggerRoutes = [];
(0, _fs.readdirSync)(__dirname).filter(function (f) {
  return !f.startsWith('_');
}).map(function (f) {
  return {
    name: f,
    module: _path["default"].join(__dirname, f)
  };
}).filter(function (a) {
  return (0, _fs.statSync)(a.module).isDirectory();
}).forEach(function (a) {
  router.use(_config.urlBase + "/".concat(a.name), require(a.module)["default"]);
  swaggerRoutes.push(__dirname + '/' + a.name + "/*.js");
}); // Url for scann documentations

module.exports.swaggerRoutes = swaggerRoutes;
var _default = router; // './src/apis/smktest/*.js'

exports["default"] = _default;