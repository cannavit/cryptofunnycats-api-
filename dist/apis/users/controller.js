"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _logger = _interopRequireDefault(require("../../services/logger"));

var _model = _interopRequireDefault(require("./model"));

// Get all elements of the labels.
var getAll = function getAll(req, res, next) {
  return Promise.resolve().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var entityData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _model["default"].find({});

          case 2:
            entityData = _context.sent;
            req.body = entityData;

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }))).then(function () {
    res.status(200).json({
      status: 'success',
      data: req.body
    });
  })["catch"](next);
};

module.exports.getAll = getAll; // Controller actions.create

var create = function create(req, res, next) {
  return Promise.resolve().then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var entityData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _logger["default"].info('Create the new user ' + JSON.stringify(req.body));

            _context2.next = 3;
            return _model["default"].create(req.body);

          case 3:
            entityData = _context2.sent;
            req.body = entityData;

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }))).then(function () {
    res.status(200).json({
      status: 'success',
      data: req.body
    });
  })["catch"](next);
};

module.exports.create = create;