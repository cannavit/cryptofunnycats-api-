/* eslint-disable no-unused-vars */
import { capitalize, merge } from 'lodash';
import os from 'os';
import path from 'path';

global.Promise = require('bluebird');
global.logger = require('winston');
global._ = require('lodash');
/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe');
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example'),
  });
}

const APP_NAME = requireProcessEnv('APP_NAME');

const config = {
  all: {
    appName: capitalize(APP_NAME),
    env: process.env.NODE_ENV || 'dev',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 3002,
    urlBase: '/api/v1',
    swaggerOptions: {
      swaggerDefinition: {
        info: {
          title: 'Smoke-Collector',
          version: 'v0.0.1',
          description: 'SmokeTest remote collector ',
        },
        schemes: ['http'],
        basePath: '/api/v1',
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            scheme: 'bearer',
            in: 'header',
          },
        },
      },
      apis: ['./src/apis/smktest/*.js'],
    },
    hostname: os.hostname || '',
    ip: process.env.IP || '0.0.0.0',
    defaultEmail: `no-reply@${APP_NAME}.com`,
    expressSSLRedirect: false,
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    // masterKey: requireProcessEnv('MASTER_KEY'),
    disableScheduler: !!process.env.DISABLE_SCHEDULER || false,
    mongo: {
      options: {
        useUnifiedTopology: true,
      },
    },
  },
  test: {
    mongo: {
      uri: `mongodb://localhost/${APP_NAME}-test`,
      options: {
        debug: false,
      },
    },
  },
  dev: {
    mongo: {
      uri: `mongodb://127.0.0.1:27017/${APP_NAME}-dev`,
      options: {
        debug: true,
        useUnifiedTopology: true,
      },
    },
  },
  production: {
    ip: process.env.IP,
    port: process.env.PORT || 8080,
    expressSSLRedirect: process.env.DISABLE_SSL_REDIRECT !== 'true',
    mongo: {
      uri: process.env.MONGODB_URI || `mongodb://localhost/${APP_NAME}`,
    },
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
