"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var passport = require("passport");

var GooglePlusTokenStrategy = require("passport-google-plus-token"); //! PASSPORT GOOGLE TOKEN STRATEGY --------- >>>
// BODY JSON GOOGLE TOKEN
// {
//   "access_token": "ya29.a0ARrdaM_6Wmud5gx3ZJ0FhHlv1akaElsO3l1hkdHG-_g38wZ6PAgk6I2ARgNXoV9mSyg2LKRwqZcWBgyPvW-XXAKwJcnbnEpndhVlJrO3J2LJ4k5On6Gb3hq9NqRzJ90-6aK6gWzLX-_C-z3605Lsu9cIr90p"
// }


passport.use("googleToken", new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_TOKEN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_TOKEN_CLIENT_SECRET
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(accessToken, refreshToken, profile, done) {
    var bodyUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //
            bodyUser = {
              type: "Client",
              isConfirmed: true,
              isActive: true,
              isDeactivated: false,
              nickname: profile.displayName,
              realname: profile.displayName,
              email: profile.emails[0].value,
              password: "9F2C926BC03AA29E62CC",
              socialLogin: true,
              socialLoginProvider: profile.provider,
              yearOfBirth: undefined,
              state: undefined,
              city: undefined,
              avatarUrl: profile._json.image.url
            };
            return _context.abrupt("return", done(null, bodyUser));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));