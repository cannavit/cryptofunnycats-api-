"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = require("./model");

var _express = require("express");

var _controller = _interopRequireDefault(require("./controller"));

var _passport = require("../../services/passport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

// new
var router = express.Router(); // const { validateSchema } = require('../../services/vinciGenerator');
// const sendmail = require('sendmail')(); //TODO pass inside of utils
// const { smokeCollectorNotifyFailsCases } = require('../../config');
// const { default: logger } = require('../../services/logger');
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');
// import { middleware as body } from '@becodebg/chocomen';

// import { schema, bodymenSchema } from './model';
// const router = new Router();

/**
 * @swagger
 *  /users:
 *    get:
 *      tags:
 *      - "users"
 *      summary: "Get List of users"
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 *        403:
 *          description: "cannot create a new course limit was reached"
 */
// router.get('/', token({ required: false }), actions.getAll);
router.get('/', function (req, res, next) {
  next();
}, _controller["default"].getAll); // /** //  * @api {get} /users/me Retrieve current user
//  * @apiGroup User
//  * @apiName RetrieveCurrent
//  * @apiPermission user
//  * @apiSuccess {User} user User's data.
//  **/
// router.get('/me', token({ required: true }), actions.showMe);

var _default = router;
exports["default"] = _default;