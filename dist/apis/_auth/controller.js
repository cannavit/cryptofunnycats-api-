"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkJWT = exports.socialLogin = exports.login = void 0;

var _uuid = _interopRequireDefault(require("uuid"));

var _jwt = require("../../services/jwt");

var _firebase = require("../../services/openAuth/firebase");

var _model = _interopRequireDefault(require("../users/model"));

var _config = _interopRequireDefault(require("../../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var login = function login(_ref, res, next) {
  var user = _ref.user;
  return (0, _jwt.sign)(user.id).then(function (token) {
    return Promise.all([token, user.view(true, null, {
      populate: true
    })]);
  }).then(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        token = _ref3[0],
        userView = _ref3[1];

    return {
      token: token,
      user: userView
    };
  }).then(success(res, 201))["catch"](next);
};

exports.login = login;

var cookieToJson = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cookie) {
    var cookiesJson, cookieName;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cookiesJson = {}; // let spsResponse, cookie;
            // ! Get Cookies data.

            cookie = cookie.replace(';', '&');
            cookie = cookie.split('&'); // ! Convert string cookies in json format.

            cookieName = 'AutorizzatoPubblicoSPSItaliaCP';
            _context.next = 6;
            return cookie.map(function (spsCookie) {
              var data = spsCookie.split('=');

              if (data[0] === cookieName) {
                cookiesJson[data[1]] = data[2];
              } else {
                var resultCookie = data[1].replace('%40', '@');
                resultCookie = resultCookie.replace('%2E', '.').replace('%2E', '.').replace('%2E', '.').replace('%2E', '.');
                cookiesJson[data[0]] = resultCookie;
              }

              return data;
            });

          case 6:
            return _context.abrupt("return", cookiesJson);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function cookieToJson(_x) {
    return _ref4.apply(this, arguments);
  };
}();

var socialLogin = function socialLogin(_ref5, res, next) {
  var body = _ref5.bodymen.body;
  var googleIdToken = body.token;
  var provider = body.provider;

  if (provider === 'firebase') {
    return (0, _firebase.getUserData)(googleIdToken).then(function (data) {
      if (data !== null && data !== void 0 && data.user) {
        var _data$user = data.user,
            displayName = _data$user.displayName,
            uid = _data$user.uid,
            photoURL = _data$user.photoURL,
            email = _data$user.email;
        return {
          displayName: displayName,
          uid: uid,
          photoURL: photoURL,
          email: email
        };
      }

      throw new Error('no social user');
    }).then(function (socialUser) {
      if (socialUser) {
        return _model["default"].findOne({
          email: socialUser.email
        }).then(function (user) {
          if (user) {
            return user;
          }

          var bodyUser = {
            email: socialUser.email,
            password: _uuid["default"].v1().toString(),
            toComplete: true
          };
          return _model["default"].create(bodyUser)["catch"](function (err) {
            /* istanbul ignore else */
            if (err.name === 'MongoError' && err.code === 11000) {
              res.status(409).json({
                valid: false,
                param: 'email - username',
                message: 'email or username already registered'
              });
            } else {
              next(err);
            }
          });
        });
      }
    }).then(function (user) {
      return {
        token: (0, _jwt.sign)(user._id),
        user: user
      };
    }).then(function (obj) {
      return Promise.all([obj.token, obj.user.view(true, null, {
        populate: true
      })]);
    }).then(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          token = _ref7[0],
          userView = _ref7[1];

      return {
        token: token,
        user: userView
      };
    }).then(success(res, 201))["catch"](next);
  }
};

exports.socialLogin = socialLogin;

var checkJWT = function checkJWT(req, res) {
  return res.sendStatus(200);
};

exports.checkJWT = checkJWT;