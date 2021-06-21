"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lodash = require("lodash");

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */
global.Promise = require('bluebird');
global.logger = require('winston');
global._ = require('lodash');
/* istanbul ignore next */

var requireProcessEnv = function requireProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }

  return process.env[name];
};
/* istanbul ignore next */


if (process.env.NODE_ENV !== 'production') {
  var dotenv = require('dotenv-safe');

  dotenv.config({
    path: _path["default"].join(__dirname, '../.env'),
    example: _path["default"].join(__dirname, '../.env.example')
  });
}

var APP_NAME = requireProcessEnv('APP_NAME');
var config = {
  all: {
    appName: (0, _lodash.capitalize)(APP_NAME),
    env: process.env.NODE_ENV || 'dev',
    root: _path["default"].join(__dirname, '..'),
    port: process.env.PORT || 3000,
    smokeCollectorNotifyFailsCases: process.env.SMOKE_COLLECTOR_NOTIFY_FAILS_CASES_TO || undefined,
    urlBase: '/api/v1',
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: 'Smoke-Collector',
          version: 'v0.0.1',
          description: 'SmokeTest remote collector '
        },
        schemes: ['http'],
        basePath: '/api/v1',
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            "in": 'header'
          }
        }
      },
      apis: ['./src/apis/smktest/*.js']
    },
    hostname: _os["default"].hostname || '',
    ip: process.env.IP || '0.0.0.0',
    defaultEmail: "no-reply@".concat(APP_NAME, ".com"),
    expressSSLRedirect: false,
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    // masterKey: requireProcessEnv('MASTER_KEY'),
    disableScheduler: !!process.env.DISABLE_SCHEDULER || false,
    mongo: {
      options: {
        useUnifiedTopology: true
      }
    }
  },
  test: {
    mongo: {
      uri: "mongodb://localhost/".concat(APP_NAME, "-test"),
      options: {
        debug: false
      }
    }
  },
  dev: {
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/".concat(APP_NAME, "-dev"),
      options: {
        debug: true,
        useUnifiedTopology: true
      }
    }
  },
  production: {
    ip: process.env.IP,
    port: process.env.PORT || 3000,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== 'true',
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/".concat(APP_NAME)
    },
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: 'Smoke-Collector',
          version: 'v0.0.1',
          description: 'SmokeTest remote collector '
        },
        schemes: ['https'],
        basePath: '/api/v1',
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            "in": 'header'
          }
        }
      },
      apis: ['./src/apis/smktest/*.js']
    }
  }
};
module.exports = (0, _lodash.merge)(config.all, config[config.all.env]);
var _default = module.exports;
exports["default"] = _default;