"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('@octokit/rest'),
    Octokit = _require.Octokit;

var axios = require('axios');

var options = {
  pull_number: 3,
  // token: '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', // TOKEN cecilio.cannav@gmail.com
  token: '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',
  // TOKEN smktest
  query: 'keyword:kubernetes extension:.yaml',
  fileExtension: '.yaml'
}; // Get project github file content using how inputs fileName.
// use the library octokit
// inputs: fileName, tokenAccess

function getProjectsUsingFileContent(_x, _x2) {
  return _getProjectsUsingFileContent.apply(this, arguments);
} // Get response of one api using axios and GET request.


function _getProjectsUsingFileContent() {
  _getProjectsUsingFileContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(options, tokenAccess) {
    var github, projects, key, response, dataProject, commitData, fileContent;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //
            github = new Octokit({
              auth: tokenAccess
            });
            console.log('@1Marker-No:_-1982188349');
            _context.next = 4;
            return github.search.code({
              q: options.query,
              sort: 'stars',
              order: 'desc',
              limit: 100
            });

          case 4:
            projects = _context.sent;
            _context.t0 = _regenerator["default"].keys(projects.data.items);

          case 6:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 60;
              break;
            }

            key = _context.t1.value;
            //
            response = {};
            items = projects.data.items[key];
            response.git_url = items.git_url;
            response.html_url = items.html_url;
            response.fileName = items.name;
            response.node_id = items.repository.node_id;
            response.full_name = items.repository.full_name;
            response.owner = items.repository.owner.login;
            response.description = items.repository.description;
            response.id = items.repository.id;
            response.query = options.query;
            response.dataSource = 'github';
            response.dataType = 'hubFiles';
            response.ownerType = items.repository.owner.type;
            response.url = items.repository.url;
            response.commits_url = items.repository.commits_url; //! Get reference commits information.

            console.log('@1Marker-No:_2013871647');
            _context.next = 27;
            return getNumberOfStars(response.url);

          case 27:
            dataProject = _context.sent;
            response.stargazers_count = dataProject.stargazers_count;
            response.watchers = dataProject.watchers;
            response.default_branch = dataProject.default_branch;
            response.language = dataProject.language;
            response.network_count = dataProject.network_count;
            response.subscribers_count = dataProject.subscribers_count;
            console.log('@1Marker-No:_644159645'); //! Get commits relationships with file

            _context.next = 37;
            return getCommitsFile(response.commits_url.replace('{/sha}', ''), options.fileExtension);

          case 37:
            commitData = _context.sent;
            response.fileCommits = commitData;
            console.log('>>>>>1008562407>>>>>');
            console.log(commitData);
            console.log('<<<<<<<<<<<<<<<<<<<');
            return _context.abrupt("break", 60);

          case 47:
            fileContent = _context.sent;
            _context.next = 54;
            break;

          case 50:
            _context.prev = 50;
            _context.t2 = _context["catch"](44);
            console.log();
            console.log('ERROR ' + _context.t2.message);

          case 54:
            response.fileContent = fileContent;
            console.log(response);
            console.log('<<<<<<<<<<<<<<<<<<<');
            return _context.abrupt("break", 60);

          case 60:
            return _context.abrupt("return", projects);

          case 61:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[44, 50]]);
  }));
  return _getProjectsUsingFileContent.apply(this, arguments);
}

function getFilesFromUrl(url) {
  return axios.get(url).then(function (response) {
    var fileContent = convertBase64ToString(response.data.content);
    return fileContent;
  });
} // Convert base64 to string


function convertBase64ToString(_x3) {
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
            return _context2.abrupt("return", new Buffer(base64, 'base64').toString());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _convertBase64ToString.apply(this, arguments);
}

function getCommitMessage(_x4) {
  return _getCommitMessage.apply(this, arguments);
} // TODO Read directory content.
// https://api.github.com/repos/strapdata/helm-charts/contents/
// project example https://github.com/zalando/postgres-operator
// http://api.github.com/repos/zalando/postgres-operator
// Know if a text mentions good or bad feelings
// Use web service
// import the librery sentiment


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

function textIsBadOrGood(text) {
  //TODO add this how part to analize
  var sentiment = require('sentiment');

  var sentimentResult = sentiment(text);
  console.log(sentimentResult);
  return sentimentResult.score;
} //Get number of downloads of one github repository
// Use octokit library
// Inputs, owner, repo and tokenAccess
// Outputs, number of downloads


function getNumberOfDownloads(_x5) {
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

function getNumberOfStars(_x6) {
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

function getCommitsFile(_x7, _x8) {
  return _getCommitsFile.apply(this, arguments);
} //Get commits files from github repository.
// Use axios library.
// inputs commitUrl.
// outputs commits files.


function _getCommitsFile() {
  _getCommitsFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(url, fileExtension) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", axios.get(url).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(response) {
                var commitsList, key, data, dataCommitMaster, commitsFileList;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        console.log(response.data[0]);
                        commitsList = [];
                        _context6.t0 = _regenerator["default"].keys(response.data);

                      case 3:
                        if ((_context6.t1 = _context6.t0()).done) {
                          _context6.next = 16;
                          break;
                        }

                        key = _context6.t1.value;
                        data = response.data[key];
                        dataCommitMaster = {
                          shaCommit: data.sha,
                          authorCommit: data.commit.author.name,
                          emailCommit: data.commit.author.email,
                          dateCommit: data.commit.author.date,
                          messageCommit: data.commit.message,
                          urlCommit: data.commit.url.replace('/git', '')
                        };
                        console.log('@1Marker-No:_-1439546817');
                        _context6.next = 10;
                        return getCommitsFiles2(dataCommitMaster.urlCommit, fileExtension, dataCommitMaster);

                      case 10:
                        commitsFileList = _context6.sent;
                        console.log('@1Marker-No:_-768349624');
                        commitsList.push(commitsFileList);
                        return _context6.abrupt("break", 16);

                      case 16:
                        return _context6.abrupt("return", commitsList);

                      case 17:
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

function getCommitsFiles2(_x9, _x10, _x11) {
  return _getCommitsFiles.apply(this, arguments);
}

function _getCommitsFiles() {
  _getCommitsFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(urlCommit, fileExtension, dataCommitMaster) {
    var response, commitsFileList, key, file;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            console.log('@1Marker-No:_1686307419'); //

            _context8.next = 3;
            return axios.get(urlCommit);

          case 3:
            response = _context8.sent;
            commitsFileList = [];
            _context8.t0 = _regenerator["default"].keys(response.data.files);

          case 6:
            if ((_context8.t1 = _context8.t0()).done) {
              _context8.next = 13;
              break;
            }

            key = _context8.t1.value;
            file = response.data.files[key];

            if (file.filename.includes(fileExtension)) {
              console.log('@1Marker-No:_-770687769');
              commitsFileList.push(_objectSpread(_objectSpread({}, dataCommitMaster), file));
            }

            return _context8.abrupt("break", 13);

          case 13:
            return _context8.abrupt("return", commitsFileList);

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _getCommitsFiles.apply(this, arguments);
}

getProjectsUsingFileContent(options, options.token);