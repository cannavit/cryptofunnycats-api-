"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var _require = require('./model'),
    filesHubCommit = _require.filesHubCommit,
    schemafilesHubCommit = _require.schemafilesHubCommit; // new


var router = express.Router();

var _require2 = require('../../services/vinciGenerator'),
    validateSchema = _require2.validateSchema;

var sendmail = require('sendmail')(); //TODO pass inside of utils


var _require3 = require('../../config'),
    smokeCollectorNotifyFailsCases = _require3.smokeCollectorNotifyFailsCases;

var _require4 = require('../../services/logger'),
    logger = _require4["default"]; // const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

/**
 * @swagger
 *  /filesHubCommit:
 *    get:
 *      tags:
 *      - "filesHubCommit"
 *      summary: "get list of the test registered by smoke-master pipelines"
 *      components:
 *        securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 */


router.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var filesHubCommits;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.info(' Get all smoke');
            logger.info(req.body);
            _context.next = 4;
            return filesHubCommit.find();

          case 4:
            filesHubCommits = _context.sent;
            logger.info('Read all filesHubCommit cases');
            res.send(filesHubCommits);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * @swagger
 *  /filesHubCommit:
 *    post:
 *      tags:
 *      - "filesHubCommit"
 *      summary: "Insert smoke-master results form remote pipeline"
 *      parameters:
 *      - in: body
 *        name: "roles"
 *        description: "pipeline data for save"
 *        example: {
 *           "projectName" : "smoke-master",
 *           "context": "kubernetes",
 *           "namespace": "smokeMaster-dev",
 *           "assertCurl": "true"
 *         }
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 *        403:
 *          description: "cannot create a new course limit was reached"
 */

router.post('/', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filesHubCommit, filesHubCommit2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return validateSchema(req.body, schemafilesHubCommit);

          case 2:
            logger.warn(req.body);
            logger.info('save data: ' + JSON.stringify(req.body));
            _context2.next = 6;
            return new filesHubCommit(req.body);

          case 6:
            filesHubCommit = _context2.sent;
            _context2.next = 9;
            return filesHubCommit.save();

          case 9:
            _context2.next = 11;
            return filesHubCommit.findOne(filesHubCommit);

          case 11:
            filesHubCommit2 = _context2.sent;
            logger.info(filesHubCommit2);
            _context2.next = 15;
            return res.send(filesHubCommit2);

          case 15:
            logger.warn('If exist fail send notification to:' + smokeCollectorNotifyFailsCases);

            try {
              if (!req.body.passTest && smokeCollectorNotifyFailsCases) {
                //TODO add this inside of the utils
                logger.info('📦 🔥 💨 Notify of Fails cases');
                logger.info('Notify To: ' + smokeCollectorNotifyFailsCases);
                sendmail({
                  from: 'no-reply@smokecollector.com',
                  to: smokeCollectorNotifyFailsCases,
                  subject: '🔥 💨 SmokeTest Fail ' + req.body.projectName,
                  html: JSON.stringify(req.body)
                }, function (err, reply) {
                  logger.info('Was send the email');
                  console.log(err && err.stack);
                  console.dir(reply);
                });
              }
            } catch (error) {
              logger.error(error.message);
            }

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // curl http://localhost:5000/api/filesHubCommits \
//     -X filesHubCommit \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"filesHubCommit 1", "context":"Lorem ipsum"}'

router.get('/filesHubCommits/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var filesHubCommit;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return filesHubCommit.findOne({
              _id: req.params.id
            });

          case 2:
            filesHubCommit = _context3.sent;
            res.send(filesHubCommit);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // curl http://localhost:5000/api/filesHubCommits/<OBJECT_ID>
// curl http://localhost:5000/api/filesHubCommits/60ccf14b8e95302f0e99295f

router.get('/filesHubCommits/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _filesHubCommit;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _filesHubCommit.findOne({
              _id: req.params.id
            });

          case 3:
            _filesHubCommit = _context4.sent;
            res.send(_filesHubCommit);
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            res.status(404);
            res.send({
              error: "filesHubCommit doesn't exist!"
            });

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;