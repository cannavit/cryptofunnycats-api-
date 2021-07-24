"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("express"),
    response = _require.response;

var shell = require("shelljs");

var _require2 = require("../../apis/certifiedTemplates/model"),
    certifiedTemplates = _require2.certifiedTemplates; // new
// oc get templates -n openshift -o json
// Eval terminal command using shelljs
// import library
// input is command line
// output is JSON


function getTemplates(_x) {
  return _getTemplates.apply(this, arguments);
}

function _getTemplates() {
  _getTemplates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(command) {
    var output, json;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(">>>>>2022343223>>>>>");
            console.log(command);
            console.log("<<<<<<<<<<<<<<<<<<<");
            _context.next = 5;
            return shell.exec(command, {
              silent: true
            });

          case 5:
            output = _context.sent;
            json = JSON.parse(output); //   let json = JSON.stringify(output);
            //   let json = output;

            return _context.abrupt("return", json);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getTemplates.apply(this, arguments);
}

function getOneTemplatesJson(_x2) {
  return _getOneTemplatesJson.apply(this, arguments);
}

function _getOneTemplatesJson() {
  _getOneTemplatesJson = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(templateName) {
    var output, json;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return shell.exec("oc get template ".concat(templateName, " -n openshift -o json"), {
              silent: true
            });

          case 2:
            output = _context2.sent;
            json = JSON.parse(output);
            return _context2.abrupt("return", json);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getOneTemplatesJson.apply(this, arguments);
}

function getOneTemplatesYaml(_x3) {
  return _getOneTemplatesYaml.apply(this, arguments);
}

function _getOneTemplatesYaml() {
  _getOneTemplatesYaml = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(templateName) {
    var output;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return shell.exec("oc get template ".concat(templateName, " -n openshift -o yaml"), {
              silent: true
            });

          case 2:
            output = _context3.sent;
            return _context3.abrupt("return", output.stdout);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOneTemplatesYaml.apply(this, arguments);
}

function getCertifiedTemplates() {
  return _getCertifiedTemplates.apply(this, arguments);
} // getCertifiedTemplates();


function _getCertifiedTemplates() {
  _getCertifiedTemplates = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    var options, templateNames, i, _response, template, templateName, templateJson, templateYaml;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log("@1Marker-No:_354467327");
            options = {
              commands: {
                getAllTemplatesName: "oc get templates -n openshift -o json"
              }
            };
            _context4.next = 4;
            return getTemplates(options.commands.getAllTemplatesName);

          case 4:
            templateNames = _context4.sent;
            i = 0;

          case 6:
            if (!(i < templateNames.items.length)) {
              _context4.next = 33;
              break;
            }

            console.log("✅ Read Template: " + i);
            _response = {};
            template = templateNames.items[i];
            templateName = template.metadata.name; //! Data template.

            _response.dataSource = "openshift";
            _response.dataType = "certifiedTemplates";
            _response.message = template.message;
            _response.namespace = "openshift";
            _response.objects = JSON.stringify(template.objects);
            _context4.next = 18;
            return getOneTemplatesJson(templateName);

          case 18:
            templateJson = _context4.sent;
            templateJson = JSON.stringify(templateJson);
            _context4.next = 22;
            return getOneTemplatesYaml(templateName);

          case 22:
            templateYaml = _context4.sent;
            _response.templateYaml = templateYaml;
            _response.templateJson = templateJson;
            console.log(">>>>>555521304>>>>>");
            console.log(templateName);
            console.log("<<<<<<<<<<<<<<<<<<<"); // Save request in db.

            _context4.next = 30;
            return certifiedTemplates.findOneAndUpdate({
              templateName: templateName
            }, _response, {
              upsert: true
            });

          case 30:
            i++;
            _context4.next = 6;
            break;

          case 33:
            return _context4.abrupt("return", options);

          case 34:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getCertifiedTemplates.apply(this, arguments);
}

module.exports.getCertifiedTemplates = getCertifiedTemplates; // getCertifiedTemplates(options);