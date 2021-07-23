"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateSchema = validateSchema;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function validateSchema(_x, _x2) {
  return _validateSchema.apply(this, arguments);
}

function _validateSchema() {
  _validateSchema = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(body, schema) {
    var shemaVariables, key, variableInput;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //! Validate if Schema data exit.
            shemaVariables = schema.paths;
            _context.t0 = _regenerator["default"].keys(body);

          case 2:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 9;
              break;
            }

            key = _context.t1.value;
            variableInput = key;

            if (shemaVariables[variableInput]) {
              _context.next = 7;
              break;
            }

            throw Error(" The Variable ".concat(variableInput, " is not define inside of the schema "));

          case 7:
            _context.next = 2;
            break;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _validateSchema.apply(this, arguments);
}