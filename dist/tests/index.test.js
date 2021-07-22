"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// const app = require('../index'); //?
var app = require('../index');

var request = require('supertest');

describe('Test Apis Express', function () {
  // Check get smktest
  // it('[GET]/smktest get all', () => {
  //   return request(app)
  //     .get('/smktest')
  //     .expect('Content-Type', /json/)
  //     .expect(200)
  //     .then((response) => {
  //       console.log('>>>>>-1943460169>>>>>');
  //       console.log(response);
  //       console.log('<<<<<<<<<<<<<<<<<<<');
  //       // expect.arrayContaining([
  //       //   expect.objectContaining({
  //       //     projectName: expect.any(String), //?
  //       //   }),
  //       // ]);
  //     });
  // });
  test('JEST TEMPLATE', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //! Is possible use /api-docs
            expect(true).toBe(true);

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
test('JEST TEMPLATE', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //! Is possible use /api-docs
          expect(true).toBe(true);

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
})));