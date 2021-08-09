"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require("../../apis/filesHub/model"),
    filesHub = _require.filesHub;

var axios = require("axios"); // Know if a text mentions good or bad feelings
// Use web service
// import the library sentiment


function textIsBadOrGood(text) {
  //TODO add this how part to analize
  var sentiment = new Sentiment();
  var result = sentiment.analyze(text);
  return result;
} //Get commits files from github repository.
// Use axios library.
// inputs commitUrl.
// outputs commits files.


function getCommitsFiles2(_x, _x2, _x3, _x4) {
  return _getCommitsFiles.apply(this, arguments);
} // Get commits_url response of gitlab.


function _getCommitsFiles() {
  _getCommitsFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(urlCommit, fileExtension, dataCommitMaster, fileHubResponse) {
    var response, commitsFileList, key, file, responseCommit, commitData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("@1Marker-No:_1686307419"); //

            _context.next = 3;
            return axios.get(urlCommit);

          case 3:
            response = _context.sent;
            commitsFileList = [];
            _context.t0 = _regenerator["default"].keys(response.data.files);

          case 6:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 27;
              break;
            }

            key = _context.t1.value;
            file = response.data.files[key];

            if (!file.filename.includes(fileExtension)) {
              _context.next = 24;
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

            _context.next = 20;
            return getCommitsFile(fileHubResponse.commitsUrl, fileExtension, fileHubResponse);

          case 20:
            commitData = _context.sent;
            console.log(">>>>>-1088011463>>>>>");
            console.log(commitData);
            console.log("<<<<<<<<<<<<<<<<<<<"); // await filesHubCommit.findOneAndUpdate(
            //   { fileHubId: fileHubResponse.fileHubId },
            //   response,
            //   { upsert: true }
            // );

          case 24:
            return _context.abrupt("break", 27);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCommitsFiles.apply(this, arguments);
}

function getCommitsFile(_x5, _x6, _x7) {
  return _getCommitsFile.apply(this, arguments);
}

function _getCommitsFile() {
  _getCommitsFile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(url, fileExtension, fileHubResponse) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", axios.get(url).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(response) {
                var commitsList, count, key, data, messageFeeling, bugWord, dataCommitMaster, commitsFileList;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        console.log(response.data[0]);
                        commitsList = [];
                        count = -1;
                        _context2.t0 = _regenerator["default"].keys(response.data);

                      case 4:
                        if ((_context2.t1 = _context2.t0()).done) {
                          _context2.next = 18;
                          break;
                        }

                        key = _context2.t1.value;
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
                        _context2.next = 13;
                        return getCommitsFiles2(dataCommitMaster.urlCommit, fileExtension, dataCommitMaster, fileHubResponse);

                      case 13:
                        commitsFileList = _context2.sent;

                        if (!(count >= 1)) {
                          _context2.next = 16;
                          break;
                        }

                        return _context2.abrupt("break", 18);

                      case 16:
                        _context2.next = 4;
                        break;

                      case 18:
                        return _context2.abrupt("return", commitsList);

                      case 19:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x8) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCommitsFile.apply(this, arguments);
}

function collectCommitsOfFiles() {
  return _collectCommitsOfFiles.apply(this, arguments);
}

function _collectCommitsOfFiles() {
  _collectCommitsOfFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var filesHubData, key, fileHub, fileIdMongo, commits_url, commitData;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("@1Marker-No:_354467327");
            console.log("@1Marker-No:_354467327");
            console.log("@1Marker-No:_354467327");
            console.log("@1Marker-No:_354467327");
            console.log("@1Marker-No:_354467327");
            _context4.next = 7;
            return filesHub.find({});

          case 7:
            filesHubData = _context4.sent;
            console.log(">>>>>1406151863>>>>>");
            console.log(filesHubData);
            console.log("<<<<<<<<<<<<<<<<<<<");
            _context4.t0 = _regenerator["default"].keys(filesHubData);

          case 12:
            if ((_context4.t1 = _context4.t0()).done) {
              _context4.next = 35;
              break;
            }

            key = _context4.t1.value;
            fileHub = filesHubData[key];
            fileIdMongo = fileHub._id;
            commits_url = fileHub.commits_url;
            console.log(">>>>>374239238>>>>>");
            console.log(fileHub);
            console.log("<<<<<<<<<<<<<<<<<<<");
            console.log(">>>>>1293116960>>>>>");
            console.log(commits_url);
            console.log(fileIdMongo);
            console.log("<<<<<<<<<<<<<<<<<<<");
            console.log("@1Marker-No:_-1887220185");
            _context4.next = 27;
            return getCommitsFile(commits_url, ".yaml", fileHub);

          case 27:
            commitData = _context4.sent;
            console.log("@1Marker-No:_131635770");
            console.log(">>>>>-342210217>>>>>");
            console.log(commitData);
            console.log("<<<<<<<<<<<<<<<<<<<");
            return _context4.abrupt("break", 35);

          case 35:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _collectCommitsOfFiles.apply(this, arguments);
}

module.exports.collectCommitsOfFiles = collectCommitsOfFiles;