"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.signSync = exports.sign = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../config");

var jwtSign = Promise.promisify(_jsonwebtoken["default"].sign);
var jwtVerify = Promise.promisify(_jsonwebtoken["default"].verify);

var sign = function sign(id, options) {
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : jwtSign;
  return method({
    id: id
  }, _config.jwtSecret, options);
};

exports.sign = sign;

var signSync = function signSync(id, options) {
  return sign(id, options, _jsonwebtoken["default"].sign);
};

exports.signSync = signSync;

var verify = function verify(token) {
  return jwtVerify(token, _config.jwtSecret);
};

exports.verify = verify;