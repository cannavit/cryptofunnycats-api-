"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.admin = exports.token = exports.master = exports.password = void 0;

var _chocomen = require("@becodebg/chocomen");

var _passport = _interopRequireDefault(require("passport"));

var _passportHttp = require("passport-http");

var _passportHttpBearer = require("passport-http-bearer");

var _passportJwt = require("passport-jwt");

var _model = require("../../apis/users/model");

var _config = require("../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var password = function password() {
  return function (req, res, next) {
    return _passport["default"].authenticate('password', {
      session: false
    }, function (err, user) {
      if (err && err.param) {
        return res.status(400).json(err);
      } else if (err || !user) {
        return res.status(401).end();
      }

      req.logIn(user, {
        session: false
      }, function (err) {
        if (err) {
          return res.status(401).end();
        }

        next();
      });
    })(req, res, next);
  };
};

exports.password = password;

var master = function master() {
  return _passport["default"].authenticate('master', {
    session: false
  });
};

exports.master = master;

var token = function token() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      required = _ref.required,
      _ref$roles = _ref.roles,
      roles = _ref$roles === void 0 ? _model.user.roles : _ref$roles;

  return function (req, res, next) {
    return _passport["default"].authenticate('token', {
      session: false
    }, function (err, user) {
      if (err || required && !user || required && !~roles.indexOf(user.role)) {
        return res.status(401).end();
      }

      req.logIn(user, {
        session: false
      }, function (err) {
        if (err) {
          return res.status(401).end();
        }

        next();
      });
    })(req, res, next);
  };
};

exports.token = token;
var admin = token({
  required: true,
  roles: ['admin']
});
exports.admin = admin;

_passport["default"].use('password', new _passportHttp.BasicStrategy(function (email, password, done) {
  var userSchema = new _chocomen.Schema({
    email: _model.schema.tree.email,
    password: _model.schema.tree.password
  });
  userSchema.validate({
    email: email,
    password: password
  }, function (err) {
    if (err) {
      done(err);
    }
  });

  _model.user.findOne({
    email: email.toLowerCase(),
    isEnabled: true
  }).then(function (user) {
    if (!user) {
      done(true);
      return null;
    }

    return user.authenticate(password, user.password).then(function (user) {
      user.pre_last_login = user.last_login;
      user.last_login = new Date();
      user.save();
      done(null, user);
      return null;
    })["catch"](done);
  });
}));

_passport["default"].use('master', new _passportHttpBearer.Strategy(function (token, done) {
  if (token === _config.masterKey) {
    done(null, {});
  } else {
    done(null, false);
  }
}));

_passport["default"].use('token', new _passportJwt.Strategy({
  secretOrKey: _config.jwtSecret,
  jwtFromRequest: _passportJwt.ExtractJwt.fromExtractors([_passportJwt.ExtractJwt.fromUrlQueryParameter('access_token'), _passportJwt.ExtractJwt.fromBodyField('access_token'), _passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer')])
}, function (_ref2, done) {
  var id = _ref2.id;

  _model.user.findOne({
    _id: id,
    isEnabled: true
  }).then(function (user) {
    done(null, user);
    return null;
  })["catch"](done);
}));

var _default = _passport["default"];
exports["default"] = _default;