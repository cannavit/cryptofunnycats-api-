"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var passport = require('passport');

var GooglePlusTokenStrategy = require('passport-google-plus-token'); //! PASSPORT GOOGLE TOKEN STRATEGY --------- >>>
// BODY JSON GOOGLE TOKEN
// {
//   "access_token": "ya29.a0ARrdaM_6Wmud5gx3ZJ0FhHlv1akaElsO3l1hkdHG-_g38wZ6PAgk6I2ARgNXoV9mSyg2LKRwqZcWBgyPvW-XXAKwJcnbnEpndhVlJrO3J2LJ4k5On6Gb3hq9NqRzJ90-6aK6gWzLX-_C-z3605Lsu9cIr90p"
// }


passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: process.env.GOOGLE_TOKEN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_TOKEN_CLIENT_SECRET
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(accessToken, refreshToken, profile, done) {
    var bodyUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //
            bodyUser = {
              type: 'Client',
              isConfirmed: true,
              isActive: true,
              isDeactivated: false,
              nickname: profile.displayName,
              realname: profile.displayName,
              email: profile.emails[0].value,
              password: '9F2C926BC03AA29E62CC',
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