"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _model = require("./model");

var _chocomen = require("@becodebg/chocomen");

var _express = require("express");

var _controller = _interopRequireDefault(require("./controller"));

var _passport = require("../../services/passport");

var express = require('express');

// import { schema, bodymenSchema } from './model';
var router = new _express.Router();
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

router.get('/', (0, _passport.master)(), _controller["default"].getAll);
/**
 * @swagger
 *  /users:
 *    post:
 *      tags:
 *      - "users"
 *      summary: "Insert User"
 *      parameters:
 *      - in: body
 *        name: "body"
 *        description: "create user account"
 *        example: {
 *          "email": "emma_1962044517@test.com",
 *          "userName": "Orr",
 *          "lastName": "Nixon",
 *          "brithDay": "30-06-1991",
 *          "password": "admin@admin"
 *          }
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 *        403:
 *          description: "cannot create a new course limit was reached"
 */

router.post('/', (0, _passport.master)(), (0, _chocomen.middleware)(_model.schemaUser.creation), _controller["default"].create);
var _default = router;
exports["default"] = _default;