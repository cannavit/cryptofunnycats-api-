"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("../../config");

var _logger = _interopRequireDefault(require("../logger"));

_logger["default"].info(' MONGODB CONNECTION: ' + JSON.stringify(_config.mongo));

Object.keys(_config.mongo.options).forEach(function (key) {
  if (key === 'debug' && _config.mongo.options[key]) {
    _mongoose["default"].set('debug', winstonMongooseLogger);
  } else {
    _mongoose["default"].set(key, _config.mongo.options[key]);
  }
});

function winstonMongooseLogger(name, i) {
  var moduleName = '\x1B[0;36mMongoose:\x1B[0m ';
  var functionCall = [name, i].join('.');
  var _args = [];

  for (var j = arguments.length - 1; j >= 2; --j) {
    _args.unshift(JSON.stringify(arguments[j]));
  }

  var params = '(' + _args.join(', ') + ')';

  _logger["default"].info(moduleName + functionCall + params);
}

_mongoose["default"].Promise = Promise;
/* istanbul ignore next */

_mongoose["default"].Types.ObjectId.prototype.view = function () {
  return {
    id: this.toString()
  };
};
/* istanbul ignore next */


_mongoose["default"].connection.on('error', function (err) {
  _logger["default"].error('🛑 MongoDB connection error: ' + err);

  process.exit(-1);
}); // Fix 'DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.' - see https://github.com/Automattic/mongoose/issues/6890


_mongoose["default"].set('useCreateIndex', true);

var _default = _mongoose["default"];
exports["default"] = _default;