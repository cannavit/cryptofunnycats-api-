"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require("@octokit/rest"),
    Octokit = _require.Octokit;

var axios = require("axios");

var _require2 = require("fs-extra"),
    appendFile = _require2.appendFile;

var Sentiment = require("sentiment");

var _require3 = require("../../apis/filesHub/model"),
    filesHub = _require3.filesHub;

var _require4 = require("../../apis/pagesRead/model"),
    pagesRead = _require4.pagesRead; // Use graphql
// https://docs.github.com/en/graphql/overview/explorer
// Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess


function getProjectsUsingFileContent() {
  return _getProjectsUsingFileContent.apply(this, arguments);
} // Get response of one api using axios and GET request.


function _getProjectsUsingFileContent() {
  _getProjectsUsingFileContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var lastPagesReference, options, tokenAccess, github, projects, nextPage, count, key, response, items, dataProject, fileContent, commitsUrl;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return pagesRead.findOne({
              reference: "ImportFilesHubs"
            });

          case 2:
            lastPagesReference = _context.sent;

            if (!lastPagesReference) {
              lastPagesReference = {
                pages: 1,
                reference: "ImportFilesHubs",
                per_page: process.env.GITHUB_RANGE
              };
            }

            lastPagesReference.per_page = process.env.GITHUB_RANGE;
            options = {
              token: process.env.GITHUB_TOKEN_COLLECTOR,
              query: "kubernetes extension:.yaml",
              fileExtension: ".yaml"
            };
            tokenAccess = options.token;
            github = new Octokit({
              auth: tokenAccess
            });
            _context.next = 10;
            return github.search.code({
              q: options.query,
              sort: "created",
              order: "desc",
              page: lastPagesReference.pages,
              per_page: lastPagesReference.per_page
            });

          case 10:
            projects = _context.sent;
            nextPage = lastPagesReference.pages + 1;
            count = -1;
            _context.t0 = _regenerator["default"].keys(projects.data.items);

          case 14:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 62;
              break;
            }

            key = _context.t1.value;
            //
            console.log("KEY: " + key + " page:" + lastPagesReference.pages + "per_page: " + lastPagesReference.per_page);
            response = {};
            items = void 0;

            try {
              items = projects.data.items[key];
            } catch (error) {}

            if (!items) {
              _context.next = 60;
              break;
            }

            response.git_url = items.git_url;
            response.html_url = items.html_url;
            response.fileName = items.name;
            response.node_id = items.repository.node_id;
            response.full_name = items.repository.full_name;
            response.owner = items.repository.owner.login;
            response.description = items.repository.description;
            response.fileId = items.repository.id;
            response.query = options.query;
            response.dataSource = "github";
            response.dataType = "hubFiles";
            response.ownerType = items.repository.owner.type;
            response.url = items.repository.url;
            response.commits_url = items.repository.commits_url; //! Get reference commits information.

            _context.next = 37;
            return getNumberOfStars(response.url);

          case 37:
            dataProject = _context.sent;
            response.stargazers_count = dataProject.stargazers_count;
            response.watchers = dataProject.watchers;
            response.default_branch = dataProject.default_branch;
            response.language = dataProject.language;
            response.network_count = dataProject.network_count;
            response.subscribers_count = dataProject.subscribers_count;
            fileContent = void 0;
            _context.prev = 45;
            _context.next = 48;
            return getFilesFromUrl(items.git_url);

          case 48:
            fileContent = _context.sent;
            _context.next = 54;
            break;

          case 51:
            _context.prev = 51;
            _context.t2 = _context["catch"](45);
            console.log("ERROR " + _context.t2.message);

          case 54:
            response.fileContent = fileContent;
            commitsUrl = response.commits_url.replace("{/sha}", ""); //! Save Inside of the BD fileHub.

            _context.next = 58;
            return filesHub.findOneAndUpdate({
              node_id: response.node_id
            }, response, {
              upsert: true
            });

          case 58:
            _context.next = 60;
            return pagesRead.findOneAndUpdate({
              reference: "ImportFilesHubs"
            }, {
              pages: nextPage,
              reference: "ImportFilesHubs",
              per_page: process.env.GITHUB_RANGE
            }, {
              upsert: true
            });

          case 60:
            _context.next = 14;
            break;

          case 62:
            return _context.abrupt("return", projects);

          case 63:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[45, 51]]);
  }));
  return _getProjectsUsingFileContent.apply(this, arguments);
}

function getFilesFromUrl(url) {
  return axios.get(url).then(function (response) {
    var fileContent = convertBase64ToString(response.data.content);
    return fileContent;
  });
} // Convert base64 to string


function convertBase64ToString(_x) {
  return _convertBase64ToString.apply(this, arguments);
} // Get one commit message of github repository
// Use octokit library
// Inputs, commit_sha, owner, repo and tokenAccess
// Outputs, commit message


function _convertBase64ToString() {
  _convertBase64ToString = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(base64) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Buffer(base64, "base64").toString());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _convertBase64ToString.apply(this, arguments);
}

function getCommitMessage(_x2) {
  return _getCommitMessage.apply(this, arguments);
} // TODO Read directory content.
// https://api.github.com/repos/strapdata/helm-charts/contents/
// project example https://github.com/zalando/postgres-operator
// http://api.github.com/repos/zalando/postgres-operator
//Get number of downloads of one github repository
// Use octokit library
// Inputs, owner, repo and tokenAccess
// Outputs, number of downloads


function _getCommitMessage() {
  _getCommitMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(options) {
    var github, commit;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            github = new Octokit({
              auth: tokenAccess
            });
            _context3.next = 3;
            return github.repos.getCommit({
              owner: owner,
              repo: repo,
              sha: commit_sha
            });

          case 3:
            commit = _context3.sent;
            return _context3.abrupt("return", commit.data.commit.message);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCommitMessage.apply(this, arguments);
}

function getNumberOfDownloads(_x3) {
  return _getNumberOfDownloads.apply(this, arguments);
} //Get number of Stars of one github repository


function _getNumberOfDownloads() {
  _getNumberOfDownloads = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(options) {
    var github, downloads;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            github = new Octokit({
              auth: tokenAccess
            });
            _context4.next = 3;
            return github.repos.getDownloads({
              owner: owner,
              repo: repo
            });

          case 3:
            downloads = _context4.sent;
            return _context4.abrupt("return", downloads.data.totalCount);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getNumberOfDownloads.apply(this, arguments);
}

function getNumberOfStars(_x4) {
  return _getNumberOfStars.apply(this, arguments);
} // Get commits_url response of gitlab.


function _getNumberOfStars() {
  _getNumberOfStars = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(url) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", axios.get(url).then(function (response) {
              return {
                stargazers_count: response.data.stargazers_count,
                watchers: response.data.watchers,
                default_branch: response.data.default_branch,
                language: response.data.language,
                network_count: response.data.network_count,
                subscribers_count: response.data.subscribers_count
              };
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getNumberOfStars.apply(this, arguments);
}

function getCommitsFile(_x5, _x6, _x7) {
  return _getCommitsFile.apply(this, arguments);
} //Get commits files from github repository.
// Use axios library.
// inputs commitUrl.
// outputs commits files.


function _getCommitsFile() {
  _getCommitsFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(url, fileExtension, fileHubResponse) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", axios.get(url).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(response) {
                var commitsList, count, key, data, messageFeeling, bugWord, dataCommitMaster, commitsFileList;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        console.log(response.data[0]);
                        commitsList = [];
                        count = -1;
                        _context6.t0 = _regenerator["default"].keys(response.data);

                      case 4:
                        if ((_context6.t1 = _context6.t0()).done) {
                          _context6.next = 18;
                          break;
                        }

                        key = _context6.t1.value;
                        count = count + 1;
                        data = response.data[key];
                        messageFeeling = textIsBadOrGood(data.commit.message); //Covert string in lowcase

                        //Covert string in lowcase
                        bugWord = haveWoldOfBug(data.commit.message.toLowerCase());
                        dataCommitMaster = {
                          shaCommit: data.sha,
                          authorCommit: data.commit.author.name,
                          emailCommit: data.commit.author.email,
                          dateCommit: data.commit.author.date,
                          messageCommit: data.commit.message,
                          messageFeelingScore: messageFeeling.score,
                          messageFeelingComparative: messageFeeling.comparative,
                          urlCommit: data.commit.url.replace("/git", ""),
                          bugWordCommit: bugWord
                        };
                        _context6.next = 13;
                        return getCommitsFiles2(dataCommitMaster.urlCommit, fileExtension, dataCommitMaster, fileHubResponse);

                      case 13:
                        commitsFileList = _context6.sent;

                        if (!(count >= 1)) {
                          _context6.next = 16;
                          break;
                        }

                        return _context6.abrupt("break", 18);

                      case 16:
                        _context6.next = 4;
                        break;

                      case 18:
                        return _context6.abrupt("return", commitsList);

                      case 19:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x12) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _getCommitsFile.apply(this, arguments);
}

function getCommitsFiles2(_x8, _x9, _x10, _x11) {
  return _getCommitsFiles.apply(this, arguments);
} // Know if a text mentions good or bad feelings
// Use web service
// import the library sentiment


function _getCommitsFiles() {
  _getCommitsFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(urlCommit, fileExtension, dataCommitMaster, fileHubResponse) {
    var response, commitsFileList, key, file, responseCommit, commitData;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log("@1Marker-No:_1686307419"); //

            _context8.next = 3;
            return axios.get(urlCommit);

          case 3:
            response = _context8.sent;
            commitsFileList = [];
            _context8.t0 = _regenerator["default"].keys(response.data.files);

          case 6:
            if ((_context8.t1 = _context8.t0()).done) {
              _context8.next = 27;
              break;
            }

            key = _context8.t1.value;
            file = response.data.files[key];

            if (!file.filename.includes(fileExtension)) {
              _context8.next = 24;
              break;
            }

            // SaveInside of the DB. filesHubCommit
            responseCommit = _objectSpread(_objectSpread({}, dataCommitMaster), file);
            console.log(">>>>>111447517>>>>>");
            console.log(responseCommit);
            console.log("<<<<<<<<<<<<<<<<<<<");
            console.log("@1Marker-No:_1496321337");
            console.log("@1Marker-No:_1496321337");
            console.log("@1Marker-No:_1496321337");
            console.log("@1Marker-No:_1496321337"); //! Get commits relationships with file

            _context8.next = 20;
            return getCommitsFile(fileHubResponse.commitsUrl, fileExtension, fileHubResponse);

          case 20:
            commitData = _context8.sent;
            console.log(">>>>>-1088011463>>>>>");
            console.log(commitData);
            console.log("<<<<<<<<<<<<<<<<<<<"); // await filesHubCommit.findOneAndUpdate(
            //   { fileHubId: fileHubResponse.fileHubId },
            //   response,
            //   { upsert: true }
            // );

          case 24:
            return _context8.abrupt("break", 27);

          case 27:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getCommitsFiles.apply(this, arguments);
}

function textIsBadOrGood(text) {
  //TODO add this how part to analize
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);
  return result;
} // getProjectsUsingFileContent(options, options.token);
//! >>>
//! <<<
// Know if String have key words, of one of the list


function haveWoldOfBug(str) {
  // List of key words related to bug, fix, error, failure
  var list = ["bug", "fix", "error", "failure", "fail", "fixup"];

  for (var i = 0; i < list.length; i++) {
    if (str.includes(list[i])) {
      return true;
    }
  }

  return false;
}

function runCollectorFilesHub() {
  return _runCollectorFilesHub.apply(this, arguments);
}

function _runCollectorFilesHub() {
  _runCollectorFilesHub = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var findFiles;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log("🕕 Run Collector of  filesHub");
            findFiles = true;

          case 2:
            if (!findFiles) {
              _context9.next = 16;
              break;
            }

            console.log("🕕 Try to collect data");
            _context9.prev = 4;
            _context9.next = 7;
            return getProjectsUsingFileContent();

          case 7:
            _context9.next = 14;
            break;

          case 9:
            _context9.prev = 9;
            _context9.t0 = _context9["catch"](4);
            console.log("🟠 Pass limit of GitHub");
            findFiles = false;
            return _context9.abrupt("break", 16);

          case 14:
            _context9.next = 2;
            break;

          case 16:
            console.log("ℹ️  Finish of GitHub");

          case 17:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[4, 9]]);
  }));
  return _runCollectorFilesHub.apply(this, arguments);
}

module.exports.runCollectorFilesHub = runCollectorFilesHub; //Know if one string is part of one kubernetes file
//Use web service.
//Import library

function isKubernetesFile(Text) {
  var kubernetes = new Kubernetes();
  var result = kubernetes.analyze(Text);
  return result;
}