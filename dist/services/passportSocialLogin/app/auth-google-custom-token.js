"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var passportCustom = require("passport-custom");

var CustomStrategy = passportCustom.Strategy;

var passport = require("passport");

var axios = require("axios");

passport.use("googleCustomToken", new CustomStrategy( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, done, next) {
    var response, profile, bodyUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.body.access_token) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return axios({
              method: "post",
              url: "https://www.googleapis.com/oauth2/v3/userinfo",
              data: {},
              headers: {
                Authorization: req.body.access_token
              }
            });

          case 5:
            response = _context.sent;

            if (!response.data.email_verified) {
              _context.next = 12;
              break;
            }

            profile = response.data;
            bodyUser = {
              type: "Client",
              isConfirmed: true,
              isActive: true,
              isDeactivated: false,
              nickname: profile.name,
              realname: profile.name,
              email: profile.email,
              password: "9F2C926BC03AA29E62CC",
              socialLogin: true,
              socialLoginProvider: "google-provider",
              yearOfBirth: undefined,
              state: undefined,
              city: undefined,
              avatarUrl: profile.picture
            };
            return _context.abrupt("return", done(null, bodyUser));

          case 12:
            return _context.abrupt("return", done(null, false));

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0.message);
            return _context.abrupt("return", done(null, false));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 15]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));