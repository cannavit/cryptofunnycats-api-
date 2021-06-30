"use strict";

var _model = require("./model");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function showMe(_x, _x2) {
  return _showMe.apply(this, arguments);
}

function _showMe() {
  _showMe = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('@1Marker-No:_354467327');
            return _context.abrupt("return", options);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _showMe.apply(this, arguments);
}

function mongooseGetAll(_x3, _x4, _x5) {
  return _mongooseGetAll.apply(this, arguments);
}

function _mongooseGetAll() {
  _mongooseGetAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var entityData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('@1Marker-No:_1612962893');
            console.log(_model.user);
            _context2.next = 4;
            return _model.user.find({});

          case 4:
            entityData = _context2.sent;
            console.log('>>>>>481659252>>>>>'); // console.log(entityData);

            console.log('<<<<<<<<<<<<<<<<<<<'); // return entityData;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _mongooseGetAll.apply(this, arguments);
}

var getAll = function getAll(req, res, next) {
  return mongooseGetAll(res, req).then(function () {// user.view(true, null, { populate: true }).then((element) => {
    //   res.json(element);
    // });
  })["catch"](next);
}; // actions.create = ({ bodymen: { body } }, res, next) => {
//   if (body && body.role === 'admin') {
//     res.status(401).json();
//     return null;
//   }
//   Entity.create(body)
//     .then((user) => user.view(true, null, { populate: true }))
//     .then(success(res, 201))
//     .catch((err) => {
//       /* istanbul ignore else */
//       if (err.name === 'MongoError' && err.code === 11000) {
//         res.status(409).json({
//           valid: false,
//           param: 'email - username',
//           message: 'email or username already registered',
//         });
//       } else {
//         next(err);
//       }
//     });
// };
// actions.update = ({ bodymen: { body }, params, user }, res, next) =>
//   Entity.findById(params.id === 'me' ? user.id : params.id)
//     .then(notFound(res))
//     .then((result) => {
//       if (body) {
//         delete body.password;
//       }
//       if (!result) {
//         return null;
//       }
//       const isAdmin = user.role === 'admin';
//       const isSelfUpdate = user.id === result.id;
//       if (!isSelfUpdate && !isAdmin) {
//         res.status(401).json({
//           valid: false,
//           message: "You can't change other user's data",
//         });
//         return null;
//       }
//       return result;
//     })
//     .then((user) => {
//       if (!user) {
//         return null;
//       }
//       for (const key in body) {
//         if (!_.isUndefined(body[key]) && user[key] !== body[key]) {
//           user[key] = null;
//           user[key] = body[key];
//           user.markModified(key);
//         }
//       }
//       return user.save();
//     })
//     .then((user) => (user ? user.view(true, null, { populate: true }) : null))
//     .then(success(res))
//     .catch(next);
// actions.updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
//   Entity.findById(params.id === 'me' ? user.id : params.id)
//     .then(notFound(res))
//     .then((result) => {
//       if (!result) {
//         return null;
//       }
//       const isSelfUpdate = user.id === result.id;
//       if (!isSelfUpdate || user.role !== 'admin') {
//         res.status(401).json({
//           valid: false,
//           param: 'password',
//           message: "You can't change other user's password",
//         });
//         return null;
//       }
//       return result;
//     })
//     .then((user) =>
//       user ? user.set({ password: body.password }).save() : null
//     )
//     .then((user) => (user ? user.view(true, null, { populate: true }) : null))
//     .then(success(res))
//     .catch(next);
// export { actions };


module.exports.getAll = getAll;