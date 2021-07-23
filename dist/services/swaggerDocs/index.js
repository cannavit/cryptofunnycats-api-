"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _config = require("../../config");

var _apis = require("../../apis");

function buildSwaggerDocs(_x) {
  return _buildSwaggerDocs.apply(this, arguments);
}

function _buildSwaggerDocs() {
  _buildSwaggerDocs = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(app) {
    var swaggerSpecs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _config.swaggerOptions.apis = _apis.swaggerRoutes;
            swaggerSpecs = (0, _swaggerJsdoc["default"])(_config.swaggerOptions); // Automatic read the apis

            app.use(_config.urlBase + '/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(swaggerSpecs));
            return _context.abrupt("return", app);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _buildSwaggerDocs.apply(this, arguments);
}

module.exports.buildSwaggerDocs = buildSwaggerDocs;