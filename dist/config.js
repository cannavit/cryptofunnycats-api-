"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = require("fs");

var _lodash = require("lodash");

var _os = _interopRequireDefault(require("os"));

var _path = _interopRequireDefault(require("path"));

/* eslint-disable no-unused-vars */
require("dotenv").config();

global.Promise = require("bluebird");
global.logger = require("winston");
global._ = require("lodash");
/* istanbul ignore next */

var requireProcessEnv = function requireProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error("You must set the " + name + " environment variable");
  }

  return process.env[name];
};
/* istanbul ignore next */


if (process.env.NODE_ENV !== "production") {
  var dotenv = require("dotenv-safe");

  dotenv.config({
    path: _path["default"].join(__dirname, "../.env"),
    example: _path["default"].join(__dirname, "../.env.example")
  });
}

var APP_NAME = requireProcessEnv("APP_NAME");
console.log(">>>>>86668013>>>>>");
console.log(process.env.DISABLE_SCHEDULER);
console.log("<<<<<<<<<<<<<<<<<<<");
var config = {
  all: {
    GITHUB_TOKEN_COLLECTOR: process.env.GITHUB_TOKEN_COLLECTOR,
    appName: (0, _lodash.capitalize)(APP_NAME),
    env: process.env.NODE_ENV || "dev",
    githubSchadulerImportFileshub: process.env.GITLAB_SCHADULER_IMPORT_FILESHUB || false,
    root: _path["default"].join(__dirname, ".."),
    enableScheduler: process.env.ENABLE_SCHEDULER,
    port: process.env.PORT || 3000,
    roundsBcrypt: 9,
    smokeCollectorNotifyFailsCases: process.env.SMOKE_COLLECTOR_NOTIFY_FAILS_CASES_TO || undefined,
    urlBase: "/api/v1",
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: "Smoke-Collector",
          version: "v0.0.1",
          description: "SmokeTest remote collector "
        },
        schemes: ["http"],
        basePath: "/api/v1",
        securityDefinitions: {
          bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            "in": "header"
          }
        }
      },
      // apis: ['./src/apis/smktest/*.js', './src/apis/auth/*.js'],
      apis: []
    },
    hostname: _os["default"].hostname || "",
    ip: process.env.IP || "0.0.0.0",
    defaultEmail: "no-reply@".concat(APP_NAME, ".com"),
    expressSSLRedirect: false,
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    masterKey: requireProcessEnv("MASTER_KEY"),
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
  dockerCompose: {
    ip: process.env.IP,
    port: process.env.PORT || 3000,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== "true",
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://mongodb:27017/".concat(APP_NAME)
    },
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: "Smoke-Collector",
          version: "v0.0.1",
          description: "SmokeTest remote collector "
        },
        schemes: ["http"],
        basePath: "/api/v1",
        securityDefinitions: {
          bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            "in": "header"
          }
        }
      },
      apis: ["./src/apis/smktest/*.js"]
    }
  },
  production: {
    ip: process.env.IP,
    port: process.env.PORT || 3000,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== "true",
    mongo: {
      uri: process.env.MONGODB_URI || "mongodb://mongodb/".concat(APP_NAME)
    },
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: "Smoke-Collector",
          version: "v0.0.1",
          description: "SmokeTest remote collector "
        },
        schemes: ["https"],
        basePath: "/api/v1",
        securityDefinitions: {
          bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            scheme: "bearer",
            "in": "header"
          }
        }
      },
      apis: [""]
    }
  }
};
module.exports = (0, _lodash.merge)(config.all, config[config.all.env]);
var _default = module.exports;
exports["default"] = _default;