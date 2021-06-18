"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _index = require("../sendNotification/index");

var _config = require("../../config");

var _logger = _interopRequireDefault(require("../logger"));

var _model = _interopRequireDefault(require("../../api/notifications/model"));

var _index2 = _interopRequireDefault(require("../mailsender/index"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var log = _logger["default"].child({
  section: '\x1B[0;35mScheduler:\x1B[0m'
});

var start = function start() {
  log.info('Starting...'); // Server time

  _nodeSchedule["default"].scheduleJob('0 0 * * *', upsertDayUtenti);

  _nodeSchedule["default"].scheduleJob('0 0 * * *', upsertDayExpositors);

  _nodeSchedule["default"].scheduleJob('0 0 * * *', alignFilters);

  _nodeSchedule["default"].scheduleJob('0 0 * * *', sendNotificationEmail);

  if (_config.pushNotificationEnabled) {
    _nodeSchedule["default"].scheduleJob('*/30 * * * * *', _index.sendNotifications);

    (0, _index.sendNotifications)();

    _logger["default"].info('SCHEDULER :FINISH THE NOTIFICATION SERVICE');
  }

  log.info('Starting...', 'DONE');
}; // function upsertUtenti() {
//   require('../mfPortal').importAllCpUsers(moment().subtract(1,'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
// }


exports.start = start;

function alignFilters() {
  require('../mfPortal').alignFilterOptions(10);
}

function upsertDayUtenti() {
  require('../mfPortal').importDayCpUsers((0, _moment["default"])().subtract(1, 'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave

} // function upsertExpositors() {
//   require('../mfPortal').importAllExpositors(moment().subtract(1,'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave
// }


function upsertDayExpositors() {
  require('../mfPortal').importDayExpositors((0, _moment["default"])().subtract(1, 'days').format('YYYYMMDD')); // qua verranno aggiornati tutti gli utenti + userprofiles. inseriti se miss su una chiave

}

function sendNotificationEmail() {
  return _sendNotificationEmail.apply(this, arguments);
}

function _sendNotificationEmail() {
  _sendNotificationEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var aggregationArray, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            aggregationArray = [{
              $match: {
                createdAt: {
                  $gte: new Date((0, _moment["default"])().format('YYYY-MM-DD'))
                }
              }
            }, {
              $match: {
                createdAt: {
                  $lte: new Date((0, _moment["default"])().add(1, 'days').format('YYYY-MM-DD'))
                }
              }
            }, {
              $group: {
                _id: '$targetUser',
                notifiche: {
                  $push: {
                    title: '$title',
                    mess: '$body'
                  }
                }
              }
            }, {
              $lookup: {
                from: 'userProfiles',
                localField: '_id',
                foreignField: 'userId',
                as: 'utente'
              }
            }];
            _context.next = 3;
            return _model["default"].aggregate(aggregationArray);

          case 3:
            result = _context.sent;
            result.forEach(function (user) {
              var body = '<br>  ';
              user.notifiche.forEach(function (notifica) {
                body += notifica.title + ' ' + notifica.mess + ' <br>';
              });

              if (user.utente[0].email) {
                _index2["default"].sendMail({
                  fromEmail: 'info@messe.it',
                  fromName: 'SPS Italia Contact Place',
                  toEmail: user.utente[0] ? user.utente[0].email : '',
                  replyTo: 'info@messe.it',
                  subject: 'Le notifiche del giorno',
                  content: "Gentile ".concat(user.utente[0].fullName, " <br>\n      Ecco quello che ti sei perso oggi su Contact Place ").concat(body, " <br>\n      Cordiali Saluti, <br>\n      Il Team di SPS Italia"),
                  contentType: 'text/html'
                });
              }
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendNotificationEmail.apply(this, arguments);
}