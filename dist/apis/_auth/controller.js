"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJWT = exports.login = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _uuid = _interopRequireDefault(require("uuid"));

var _jwt = require("../../services/jwt");

var _model = _interopRequireDefault(require("../users/model"));

var _config = _interopRequireDefault(require("../../config"));

// In this file you can configure migrate-mongo
var login = function login(_ref, res, next) {
  var user = _ref.user;
  return (0, _jwt.sign)(user.id).then(function (token) {
    return Promise.all([token, user.view(true, null, {
      populate: true
    })]);
  }).then(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
        token = _ref3[0],
        userView = _ref3[1];

    return {
      token: token,
      user: userView
    };
  }).then(success(res, 201))["catch"](next);
};

exports.login = login;

var checkJWT = function checkJWT(req, res) {
  return res.sendStatus(200);
};

exports.checkJWT = checkJWT;