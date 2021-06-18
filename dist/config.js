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
    env: process.env.NODE_ENV || 'development',
    root: _path["default"].join(__dirname, '..'),
    port: process.env.PORT || 9000,
    hostname: _os["default"].hostname || '',
    ip: process.env.IP || '0.0.0.0',
    defaultEmail: "no-reply@".concat(APP_NAME, ".com"),
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    expressSSLRedirect: false,
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    accessKeyId: requireProcessEnv('ACCESS_KEY_ID'),
    secretAccessKey: requireProcessEnv('SECRET_ACCESS_KEY'),
    s3BucketName: requireProcessEnv('S3_BUCKET_NAME'),
    firebaseSDK: JSON.parse(process.env.FIREBASE_SDK || false),
    pushNotificationEnabled: process.env.PUSH_NOTIFICATION_ENABLED === 'true' || false,
    disableScheduler: !!process.env.DISABLE_SCHEDULER || false,
    mongo: {
      options: {
        useUnifiedTopology: true
      }
    },
    spsUrl: process.env.SPS_URL,
    spsUrlExpositor: process.env.SPS_URL_EXPOSITOR,
    spsUrlCpUserPublicImg: process.env.SPS_CP_USER_PUBLIC_IMG,
    spsUrlExpositorPublicImg: process.env.SPS_CP_EXPOSITOR_PUBLIC_IMG,
    sendEmailNotificationsOnlyTesters: process.env.SEND_NOTIFICATION_EMAIL_ONLY_TESTERS || false,
    mysql: {
      server: process.env.MYSQL_SERVER,
      database: process.env.MYSQL_DATABASE,
      uid: process.env.MYSQL_UID,
      password: process.env.MYSQL_PASSWORD,
      port: process.env.MYSQL_PORT
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
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/".concat(APP_NAME, "-dev"),
      options: {
        debug: true,
        useUnifiedTopology: true
      }
    }
  },
  production: {
    ip: process.env.IP,
    port: process.env.PORT || 8080,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== 'true',
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://localhost/".concat(APP_NAME)
    }
  }
};
module.exports = (0, _lodash.merge)(config.all, config[config.all.env]);
var _default = module.exports;
exports["default"] = _default;