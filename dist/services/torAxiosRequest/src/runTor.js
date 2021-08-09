"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("../../../config");

var _require = require("express-winston"),
    logger = _require.logger;

var shell = require("shelljs"); // const { torRunIn } = require("../../../config");


var axios = require("axios"); // Replace or load axios.


var systemctl = require("systemctl");

function runTorService(_x) {
  return _runTorService.apply(this, arguments);
}

function _runTorService() {
  _runTorService = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(status) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_config.operativeSystem === "mac")) {
              _context.next = 3;
              break;
            }

            _context.next = 3;
            return shell.exec("brew services ".concat(status, " tor"), {
              silent: false
            });

          case 3:
            if (!(_config.operativeSystem === "linux/ubuntu")) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return shell.exec("systemctl ".concat(status, " tor"), {
              silent: false
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runTorService.apply(this, arguments);
}

module.exports.runTorService = runTorService;

function openAxiosTor(_x2) {
  return _openAxiosTor.apply(this, arguments);
}

function _openAxiosTor() {
  _openAxiosTor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(options) {
    var SocksProxyAgent, proxyOptions, httpsAgent, baseUrl, axios2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!options) {
              options = {};
            } // EXAMPLE VARIABLES:
            //Import Tor Command.


            _context2.next = 3;
            return runTorService("stop");

          case 3:
            _context2.next = 5;
            return runTorService("start");

          case 5:
            // Instruction . Execute in one terminal : (tor) or  (tor y) second plan
            //  HIDE_IP=true
            // HIDE_PROXY_HOST_PORT='127.0.0.1:9050'
            SocksProxyAgent = require("socks-proxy-agent"); //Hide IP with sockets and Tor.

            proxyOptions = "socks5://".concat(process.env.HIDE_PROXY_HOST_PORT);
            httpsAgent = new SocksProxyAgent(proxyOptions);
            baseUrl = "127.0.0.1";
            console.log(">>>>>920810209>>>>>");
            console.log(httpsAgent, baseUrl);
            console.log("<<<<<<<<<<<<<<<<<<<");
            _context2.next = 14;
            return axios.create({
              baseUrl: baseUrl,
              httpsAgent: httpsAgent
            });

          case 14:
            axios2 = _context2.sent;
            console.log(">>>>>-1709527530>>>>>");
            console.log(axios2);
            console.log("<<<<<<<<<<<<<<<<<<<");
            return _context2.abrupt("return", axios2);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _openAxiosTor.apply(this, arguments);
}

module.exports.openAxiosTor = openAxiosTor;