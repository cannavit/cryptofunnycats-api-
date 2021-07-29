"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _readOnlyError2 = _interopRequireDefault(require("@babel/runtime/helpers/readOnlyError"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _globals = require("@jest/globals");

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _require = require("@octokit/rest"),
    Octokit = _require.Octokit;

var axios = require("axios"); // const { appendFile } = require("fs-extra");
// var Sentiment = require("sentiment");


var _require2 = require("../../apis/filesHub/model"),
    filesHub = _require2.filesHub;

var _require3 = require("../../apis/repositoryHub/model"),
    repositoryHub = _require3.repositoryHub;

var _require4 = require("../../apis/pagesRead/model"),
    pagesRead = _require4.pagesRead;

var _require5 = require("../../apis/filesHubCommit/model"),
    filesHubCommit = _require5.filesHubCommit;

var dateFormat = require("dateformat");

var _require6 = require("sleepjs"),
    sleep = _require6.sleep;

var _require7 = require("fs-extra"),
    appendFile = _require7.appendFile;

var _require8 = require("express"),
    response = _require8.response;

var Sentiment = require("sentiment");

// import logger, { format, transports } from "winston";
//!HIDE IP CONFIGURATION.
var _require9 = require("../torAxiosRequest/src/runTor"),
    runTorService = _require9.runTorService;

if (process.env.HIDE_IP) {
  // EXAMPLE VARIABLES:
  //Import Tor Command.
  runTorService("stop");
  runTorService("start"); // Instruction . Execute in one terminal : (tor) or  (tor y) second plan
  //  HIDE_IP=true
  // HIDE_PROXY_HOST_PORT='127.0.0.1:9050'

  var SocksProxyAgent = require("socks-proxy-agent"); //Hide IP with sockets and Tor.


  var proxyOptions = "socks5://".concat(process.env.HIDE_PROXY_HOST_PORT);
  var httpsAgent = new SocksProxyAgent(proxyOptions);
  var baseUrl = "127.0.0.1";
  axios = axios.create({
    baseUrl: baseUrl,
    httpsAgent: httpsAgent
  });
} // Know if String have key words, of one of the list


function haveWoldOfBug(str) {
  // List of key words related to bug, fix, error, failure
  var list = ["bug", "fix", "error", "failure", "fail", "fixup", "solve", "resolve", "reparado"];

  for (var i = 0; i < list.length; i++) {
    if (str.includes(list[i])) {
      return true;
    }
  }

  return false;
}

function rotateGitHubTokens(_x, _x2, _x3) {
  return _rotateGitHubTokens.apply(this, arguments);
} // Use graphql
// https://docs.github.com/en/graphql/overview/explorer
// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess


function _rotateGitHubTokens() {
  _rotateGitHubTokens = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(github, query, lastPagesReference) {
    var project, tokenList, _iterator, _step, token, _github, gitHubObj;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            _logger["default"].info(" Search Projects with Query: " + query);

            _context.next = 4;
            return github.search.code({
              q: query,
              sort: "created",
              order: "desc",
              page: lastPagesReference.pages,
              per_page: lastPagesReference.per_page
            });

          case 4:
            projects = _context.sent;
            _context.next = 36;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            _logger["default"].warn(" 🟠 Rotate github Token");

            tokenList = process.env.TOKEN_LIST.split(";"); //! Get token list.

            _iterator = _createForOfIteratorHelper(tokenList);
            _context.prev = 12;

            _iterator.s();

          case 14:
            if ((_step = _iterator.n()).done) {
              _context.next = 28;
              break;
            }

            token = _step.value;
            _github = new Octokit({
              auth: tokenAccess
            });
            _context.prev = 17;
            _context.next = 20;
            return _github.search.code({
              q: query,
              sort: "created",
              order: "desc",
              page: lastPagesReference.pages,
              per_page: lastPagesReference.per_page
            });

          case 20:
            projects = _context.sent;
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](17);

            _logger["default"].error(" 🛑 ERROR WITH TOKEN: " + token);

          case 26:
            _context.next = 14;
            break;

          case 28:
            _context.next = 33;
            break;

          case 30:
            _context.prev = 30;
            _context.t2 = _context["catch"](12);

            _iterator.e(_context.t2);

          case 33:
            _context.prev = 33;

            _iterator.f();

            return _context.finish(33);

          case 36:
            gitHubObj = {
              github: github,
              projects: projects
            };
            return _context.abrupt("return", gitHubObj);

          case 38:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7], [12, 30, 33, 36], [17, 23]]);
  }));
  return _rotateGitHubTokens.apply(this, arguments);
}

function getProjectsUsingFileContent2() {
  return _getProjectsUsingFileContent.apply(this, arguments);
}

function _getProjectsUsingFileContent() {
  _getProjectsUsingFileContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var incrementDateInDays, referenceConfiguration, useToken, dateNext, lastPagesReference, myPastDate, dateFind, options, tokenAccess, github, findNewDateFilter, projects, dataInit, initSearch, dateFindFormat, _dateFindFormat, nextPage, count, responseLast, key, _response, items, lastRepository, created_at;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Options params:
            incrementDateInDays = 30;
            referenceConfiguration = "ImportFilesHubsV2";
            useToken = true; // Read Read Configuration.

            _context2.next = 5;
            return pagesRead.findOne({
              reference: referenceConfiguration
            });

          case 5:
            lastPagesReference = _context2.sent;

            if (!lastPagesReference) {
              lastPagesReference = {
                pages: 1,
                reference: referenceConfiguration,
                per_page: 1000
              };
            }

            if (!lastPagesReference.dateFind) {
              myPastDate = new Date();
              myPastDate = myPastDate.setDate(myPastDate.getDate() - 3700); //1230

              console.log(myPastDate);
              dateFind = dateFormat(myPastDate, "yyyy-mm-dd");
              lastPagesReference.dateFind = dateFind;
            }

            lastPagesReference.per_page = process.env.GITHUB_RANGE; // 2014-07-27T13

            options = {
              token: process.env.GITHUB_TOKEN_COLLECTOR || "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",
              query: "kubernetes created:> ".concat(lastPagesReference.dateFind),
              fileExtension: ".yaml",
              finishIt: false,
              sizeDownlaodLimit: 10000,
              tokensList: process.env.TOKEN_LIST.split(";")
            };
            tokenAccess = options.token;
            github = new Octokit({
              auth: tokenAccess
            });
            findNewDateFilter = true;
            lastPagesReference.per_page;
            console.log(lastPagesReference.dateFind);
            dataInit = lastPagesReference.dateFind; // If was closed the last step.

            initSearch = true;

            if (!lastPagesReference.finishIt) {
              _context2.next = 59;
              break;
            }

            _logger["default"].info(" 🟢 LAST STATUS finishIt: true");

          case 19:
            if (!findNewDateFilter) {
              _context2.next = 57;
              break;
            }

            // Add right format for use filter in github
            dateFindFormat = dateFormat(lastPagesReference.dateFind, "yyyy-mm-dd");
            dateFindFormat = String(dateFindFormat); // Rotate tokens if is necessary.

            rotateGitHubTokens(github, "kubernetes created:> ".concat(dateFindFormat), lastPagesReference);
            gitHubObj.github, (0, _readOnlyError2["default"])("github");
            projects = gitHubObj.projects;

            _logger["default"].info(" 🆕  🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕   🆕 ");

            _logger["default"].info(" \uD83D\uDC31 GitHub Filter: kubernetes created:> ".concat(dateFindFormat));

            _logger["default"].info("  📆 DATE ORIGINAL:" + lastPagesReference.dateFind);

            _logger["default"].info("  📆 DATE CONVERT:" + dateFindFormat);

            _logger["default"].info("  📦 Search new Projects: URL= " + projects.url);

            _logger["default"].info("  📦 Search new Projects: status: " + projects.status);

            _logger["default"].info("  📦 Search new Projects: Data: " + JSON.stringify(projects.data)); //! If items == 0, change the date filter.


            if (!(projects.data.items.length == 0 || initSearch)) {
              _context2.next = 37;
              break;
            }

            //
            lastPagesReference.dateFind = new Date(lastPagesReference.dateFind.getTime() + incrementDateInDays * 1000 * 60 * 60 * 24);
            initSearch = false;
            _context2.next = 53;
            break;

          case 37:
            if (!(projects.data.total_count <= 1000)) {
              _context2.next = 45;
              break;
            }

            console.log("👍 PackSize: " + projects.data.total_count);
            console.log("✅ WAS DETECT ONE PACK FOR PROCESSING");
            console.log("\uD83D\uDCE6 QUERY USED: kubernetes created:> ".concat(dateFindFormat));
            findNewDateFilter = false;
            lastPagesReference.dateFind = dataInit; // Reset data

            _context2.next = 53;
            break;

          case 45:
            console.log("🖐 PackSize: " + projects.data.total_count);
            console.log("🚨 THE PACK IS MORE OF 1000");
            console.log("\uD83D\uDCE6 QUERY USED: kubernetes created:> ".concat(dateFindFormat));

            if (!(incrementDateInDays < 1)) {
              _context2.next = 51;
              break;
            }

            console.log("🔥 NO WAS POSSIBLE AUTOCORRECT THE DATA");
            return _context2.abrupt("break", 57);

          case 51:
            incrementDateInDays = incrementDateInDays - 4;
            console.log("Automatic correction: incrementDateInDays= " + incrementDateInDays);

          case 53:
            _context2.next = 55;
            return sleep(2000);

          case 55:
            _context2.next = 19;
            break;

          case 57:
            _context2.next = 66;
            break;

          case 59:
            console.log(" 🟠 LAST STATUS finishIt: false"); // Reuse the last data for collect the information.

            _dateFindFormat = dateFormat(lastPagesReference.dateFind, "yyyy-mm-dd");
            _dateFindFormat = String(_dateFindFormat);
            console.log("\u2705 2 kubernetes created:> ".concat(_dateFindFormat)); // Rotate tokens if is necessary.

            rotateGitHubTokens(github, "kubernetes created:> ".concat(_dateFindFormat), lastPagesReference);
            gitHubObj.github, (0, _readOnlyError2["default"])("github");
            projects = gitHubObj.projects;

          case 66:
            console.log(">>>>>1256229358>>>>>");
            console.log("@1Marker-No:_19512097");
            console.log("@1Marker-No:_19512097");
            console.log("@1Marker-No:_19512097");
            console.log(lastPagesReference.dateFind);
            console.log("@1Marker-No:_19512097");
            console.log("@1Marker-No:_19512097");
            console.log("@1Marker-No:_19512097");
            console.log("<<<<<<<<<<<<<<<<<<<");
            _context2.next = 77;
            return pagesRead.findOneAndUpdate({
              reference: referenceConfiguration
            }, {
              pages: nextPage,
              reference: referenceConfiguration,
              per_page: process.env.GITHUB_RANGE,
              dateFind: lastPagesReference.dateFind,
              finishIt: false,
              total_count: projects.data.total_count
            }, {
              upsert: true
            });

          case 77:
            nextPage = lastPagesReference.pages + 1;
            count = -1;
            _context2.t0 = _regenerator["default"].keys(projects.data.items);

          case 80:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 96;
              break;
            }

            key = _context2.t1.value;
            return _context2.abrupt("break", 96);

          case 92:
            _response = _context2.sent;

          case 93:
            responseLast = _response;
            _context2.next = 80;
            break;

          case 96:
            console.log();
            console.log("🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢");
            console.log(" ✅ Complated one full cicle.");
            console.log();
            _context2.next = 102;
            return repositoryHub.find({}).sort({
              _id: -1
            }).limit(1);

          case 102:
            lastRepository = _context2.sent;

            try {
              created_at = lastRepository[0].created_at;
            } catch (error) {
              // created_at = responseLast.created_at;
              created_at = lastPagesReference.dateFind;
            }

            _context2.next = 106;
            return pagesRead.findOneAndUpdate({
              reference: referenceConfiguration
            }, {
              pages: nextPage,
              reference: referenceConfiguration,
              per_page: process.env.GITHUB_RANGE,
              finishIt: true
            }, {
              upsert: true
            });

          case 106:
            return _context2.abrupt("return", projects);

          case 107:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getProjectsUsingFileContent.apply(this, arguments);
}

function collectItemInfo(_x4) {
  return _collectItemInfo.apply(this, arguments);
} // Get response of one api using axios and GET request.


function _collectItemInfo() {
  _collectItemInfo = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
    var items, response, resp;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // Collect basic information.
            items = options.items;
            response = {};
            response.git_url = items.git_url;
            response.html_url = items.html_url;
            response.fileName = items.name;
            response.node_id = items.repository.node_id;
            response.full_name = items.repository.full_name;
            response.owner = items.repository.owner.login;
            response.description = items.repository.description;
            response.repositoryId = items.repository.id; // response.query = options.query;

            response.dataSource = "github";
            response.dataType = "hubFiles";
            response.ownerType = items.repository.owner.type;
            response.url = items.repository.url;
            response.commits_url = items.repository.commits_url; //! Get reference commits information.
            // Get number of starts

            _context3.next = 17;
            return axiosHackGitHub(response.url, options);

          case 17:
            resp = _context3.sent;
            response = _objectSpread(_objectSpread({}, response), {}, {
              stargazers_count: resp.data.stargazers_count,
              watchers: resp.data.watchers,
              default_branch: resp.data.default_branch,
              language: resp.data.language,
              network_count: resp.data.network_count,
              subscribers_count: resp.data.subscribers_count,
              created_at: resp.data.created_at,
              updated_at: resp.data.updated_at,
              pushed_at: resp.data.pushed_at
            }); //! Collect files of repostory (Free)

            options.response = response;
            _context3.next = 22;
            return collectFiles(options);

          case 22:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 24:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _collectItemInfo.apply(this, arguments);
}

function getFilesFromUrl(_x5) {
  return _getFilesFromUrl.apply(this, arguments);
} // Convert base64 to string


function _getFilesFromUrl() {
  _getFilesFromUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(url) {
    var response, fileContent;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return axiosHackGitHub(url);

          case 2:
            response = _context4.sent;
            _context4.next = 5;
            return convertBase64ToString(response.data.content);

          case 5:
            fileContent = _context4.sent;
            response = {
              shaFile: response.data.sha,
              size: response.data.size,
              url: response.data.url,
              content: response.data.content,
              decodeContent: fileContent
            };
            return _context4.abrupt("return", response);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getFilesFromUrl.apply(this, arguments);
}

function convertBase64ToString(_x6) {
  return _convertBase64ToString.apply(this, arguments);
} //Get number of downloads of one github repository
// Use octokit library
// Inputs, owner, repo and tokenAccess
// Outputs, number of downloads


function _convertBase64ToString() {
  _convertBase64ToString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(base64) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            result = new Buffer(base64, "base64").toString();
            return _context5.abrupt("return", result);

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _convertBase64ToString.apply(this, arguments);
}

function getNumberOfDownloads(_x7) {
  return _getNumberOfDownloads.apply(this, arguments);
} // getProjectsUsingFileContent(options, options.token);
//! >>>
//! <<<


function _getNumberOfDownloads() {
  _getNumberOfDownloads = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(options) {
    var github, downloads;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            github = new Octokit({
              auth: tokenAccess
            });
            _context6.next = 3;
            return github.repos.getDownloads({
              owner: owner,
              repo: repo
            });

          case 3:
            downloads = _context6.sent;
            return _context6.abrupt("return", downloads.data.totalCount);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getNumberOfDownloads.apply(this, arguments);
}

function runCollectorFilesHub() {
  return _runCollectorFilesHub.apply(this, arguments);
}

function _runCollectorFilesHub() {
  _runCollectorFilesHub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var findFiles;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log("🕕 Run Collector of  filesHub");
            findFiles = true;

          case 2:
            if (!findFiles) {
              _context7.next = 15;
              break;
            }

            console.log("🕕 Try to collect data");
            _context7.prev = 4;
            _context7.next = 7;
            return getProjectsUsingFileContent();

          case 7:
            _context7.next = 13;
            break;

          case 9:
            _context7.prev = 9;
            _context7.t0 = _context7["catch"](4);
            console.log("🟠 Pass limit of GitHub");
            findFiles = false;

          case 13:
            _context7.next = 2;
            break;

          case 15:
            console.log("ℹ️  Finish of GitHub");

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 9]]);
  }));
  return _runCollectorFilesHub.apply(this, arguments);
}

module.exports.getProjectsUsingFileContent2 = getProjectsUsingFileContent2;

function axiosHackGitHub(_x8, _x9) {
  return _axiosHackGitHub.apply(this, arguments);
}

function _axiosHackGitHub() {
  _axiosHackGitHub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(url, options) {
    var config, response;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            config = {
              method: "get",
              url: url
            };
            _context8.prev = 1;
            _context8.next = 4;
            return axios(url);

          case 4:
            response = _context8.sent;
            console.log(" 🟢 🐝 🐝 🐝 Success [GET] axios to: " + url); // response = response.data;

            _context8.next = 37;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](1);
            _context8.prev = 10;

            try {
              console.log(" 🚨 1) ERROR GITHUB MESSGE: " + _context8.t0.response.data.message);
            } catch (error) {}

            console.log(" 🚨 1) ERROR GITHUB MESSGE: " + _context8.t0);
            console.log(" 🧅 Try Change Tor IP");
            console.log(" 🔑 Breaking GITHUB IP Control");
            _context8.next = 17;
            return runTorService("restart");

          case 17:
            console.log(" 🕖 Wait 5 seconds");
            _context8.next = 20;
            return sleep(1000);

          case 20:
            console.log(" 🟠 🐝 🐝 🐝 Success [GET] axios to: " + url);
            _context8.next = 23;
            return axios(url);

          case 23:
            response = _context8.sent;
            console.log(" 🟢 🐝 🐝 🐝 Success [GET] axios to: " + url);
            console.log(" 🔓 🔫 Pass GitHub Control 🥳 ");
            _context8.next = 37;
            break;

          case 28:
            _context8.prev = 28;
            _context8.t1 = _context8["catch"](10);
            console.log(">>>>>-1538259196>>>>>");
            console.log(_context8.t1);
            console.log("<<<<<<<<<<<<<<<<<<<");

            try {
              console.log(" 🚨 2) ERROR GITHUB MESSGE: " + _context8.t1.response.data.message);
            } catch (error) {}

            console.log(" 🚨 2) ERROR GITHUB MESSGE: " + _context8.t1);
            console.log(" 🧅 Try Change Tor IP");
            console.log(" 🔑 Breaking GITHUB IP Control");

          case 37:
            return _context8.abrupt("return", response);

          case 38:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[1, 8], [10, 28]]);
  }));
  return _axiosHackGitHub.apply(this, arguments);
}

function collectFiles(_x10) {
  return _collectFiles.apply(this, arguments);
} //TODO GET ALL COMMITS BY FILE.
// http://api.github.com/repos/:owner/:repo/commits?path=PATH_TO_FILE


function _collectFiles() {
  _collectFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(options) {
    var response, full_name, files, searchElement, fileData, _iterator2, _step2, item, _iterator3, _step3, extension, repositoryHubResponse, fileContent, filesHubContent, commits, _iterator4, _step4, commit, messageFeeling, commitData, filesHubCommitContent;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            response = options.response;
            full_name = response.full_name;
            _context9.next = 4;
            return axiosHackGitHub("https://api.github.com/repos/".concat(full_name, "/git/trees/HEAD"), options);

          case 4:
            files = _context9.sent;
            searchElement = [".yaml", "Dockerfile", ".yml"]; //TODO add environment variable

            if (!files) {
              _context9.next = 93;
              break;
            }

            fileData = {
              familySha: files.data.sha,
              familyUrl: files.data.url
            }; // for files.data.items

            _iterator2 = _createForOfIteratorHelper(files.data.tree);
            _context9.prev = 9;

            _iterator2.s();

          case 11:
            if ((_step2 = _iterator2.n()).done) {
              _context9.next = 85;
              break;
            }

            item = _step2.value;
            _iterator3 = _createForOfIteratorHelper(searchElement);
            _context9.prev = 14;

            _iterator3.s();

          case 16:
            if ((_step3 = _iterator3.n()).done) {
              _context9.next = 75;
              break;
            }

            extension = _step3.value;

            if (!item.path.includes(extension)) {
              _context9.next = 73;
              break;
            }

            console.log("@1Marker-No:_1730564244"); //

            fileData = _objectSpread(_objectSpread({}, fileData), {}, {
              sha: item.sha,
              path: item.path,
              url: item.url,
              size: item.size,
              fileType: extension,
              full_name: response.full_name
            });

            if (!(options.sizeDownlaodLimit >= item.size)) {
              _context9.next = 73;
              break;
            }

            _context9.next = 24;
            return repositoryHub.findOneAndUpdate({
              repositoryId: response.repositoryId
            }, response, {
              upsert: true
            });

          case 24:
            repositoryHubResponse = _context9.sent;

            if (repositoryHubResponse) {
              _context9.next = 29;
              break;
            }

            _context9.next = 28;
            return repositoryHub.findOne({
              repositoryId: response.repositoryId
            });

          case 28:
            repositoryHubResponse = _context9.sent;

          case 29:
            _context9.next = 31;
            return getFilesFromUrl(fileData.url);

          case 31:
            fileContent = _context9.sent;
            _context9.next = 34;
            return _objectSpread(_objectSpread({}, fileData), fileContent);

          case 34:
            fileData = _context9.sent;
            //! Save Files
            delete fileData.content; // Delete encode content.
            //! filesHub...

            console.log("@1Marker-No:_1531626854");
            _context9.next = 39;
            return filesHub.findOneAndUpdate({
              repositoryId: repositoryHubResponse._id,
              path: fileData.path
            }, fileData, {
              upsert: true
            });

          case 39:
            filesHubContent = _context9.sent;

            if (filesHubContent) {
              _context9.next = 44;
              break;
            }

            _context9.next = 43;
            return filesHub.findOne({
              repositoryId: repositoryHubResponse._id,
              path: fileData.path
            });

          case 43:
            filesHubContent = _context9.sent;

          case 44:
            //! Get commits history.
            console.log("@1Marker-No:_1256221867");
            _context9.next = 47;
            return axiosHackGitHub("http://api.github.com/repos/".concat(response.full_name, "/commits?path=").concat(fileData.path), options);

          case 47:
            commits = _context9.sent;

            if (!commits) {
              _context9.next = 73;
              break;
            }

            console.log("@1Marker-No:_1046474064");
            commits = commits.data;
            _iterator4 = _createForOfIteratorHelper(commits);
            _context9.prev = 52;

            _iterator4.s();

          case 54:
            if ((_step4 = _iterator4.n()).done) {
              _context9.next = 65;
              break;
            }

            commit = _step4.value;
            messageFeeling = textIsBadOrGood(commit.commit.message.toLowerCase());
            commitData = {
              shaCommit: commit.sha,
              path: fileData.path,
              full_name: response.full_name,
              fileType: extension,
              commiterEmail: commit.commit.committer.email,
              commiterDate: commit.commit.committer.date,
              message: commit.commit.message,
              commentCount: commit.commit.comment_count,
              isBugCommit: haveWoldOfBug(commit.commit.message.toLowerCase()),
              messageFeelingScore: messageFeeling.score,
              messageFeelingComparative: messageFeeling.comparative
            };
            _context9.next = 60;
            return filesHubCommit.findOneAndUpdate({
              fileHubId: filesHubContent._id,
              shaCommit: commitData.shaCommit
            }, commitData, {
              upsert: true
            });

          case 60:
            filesHubCommitContent = _context9.sent;
            console.log("@1Marker-No:_-1435695396");
            console.log("👍 Success Copy Commit to DB: " + commit.sha);

          case 63:
            _context9.next = 54;
            break;

          case 65:
            _context9.next = 70;
            break;

          case 67:
            _context9.prev = 67;
            _context9.t0 = _context9["catch"](52);

            _iterator4.e(_context9.t0);

          case 70:
            _context9.prev = 70;

            _iterator4.f();

            return _context9.finish(70);

          case 73:
            _context9.next = 16;
            break;

          case 75:
            _context9.next = 80;
            break;

          case 77:
            _context9.prev = 77;
            _context9.t1 = _context9["catch"](14);

            _iterator3.e(_context9.t1);

          case 80:
            _context9.prev = 80;

            _iterator3.f();

            return _context9.finish(80);

          case 83:
            _context9.next = 11;
            break;

          case 85:
            _context9.next = 90;
            break;

          case 87:
            _context9.prev = 87;
            _context9.t2 = _context9["catch"](9);

            _iterator2.e(_context9.t2);

          case 90:
            _context9.prev = 90;

            _iterator2.f();

            return _context9.finish(90);

          case 93:
            return _context9.abrupt("return", response);

          case 94:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[9, 87, 90, 93], [14, 77, 80, 83], [52, 67, 70, 73]]);
  }));
  return _collectFiles.apply(this, arguments);
}

function textIsBadOrGood(text) {
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);
  return result;
}