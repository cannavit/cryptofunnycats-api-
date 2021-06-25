'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.validateSchema = validateSchema;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function validateSchema(_x, _x2) {
  return _validateSchema.apply(this, arguments);
}

function _validateSchema() {
  _validateSchema = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee(body, schema) {
      var shemaVariables, key, variableInput;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              //! Validate if Schema data exit.
              shemaVariables = schema.paths;
              _context.t0 = regeneratorRuntime.keys(body);

            case 2:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 9;
                break;
              }

              key = _context.t1.value;
              variableInput = key;

              if (shemaVariables[variableInput]) {
                _context.next = 7;
                break;
              }

              throw Error(
                ' The Variable is not define inside of the schema :' +
                  shemaVariables[variableInput] +
                  ' ' +
                  variableInput
              );

            case 7:
              _context.next = 2;
              break;

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    })
  );
  return _validateSchema.apply(this, arguments);
}
