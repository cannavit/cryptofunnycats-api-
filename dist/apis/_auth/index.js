"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chocomen = require("@becodebg/chocomen");

var _express = require("express");

var _passport = require("../../services/passport");

var _controller = _interopRequireDefault(require("../users/controller"));

var _controller2 = require("./controller");

var _model = require("../users/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _express.Router();
/**
 * @swagger
 *  /auth/register:
 *    post:
 *      tags:
 *      - "auth"
 *      summary: "Register one User"
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
 *          description: "cannot create a new Account"
 */

router.post('/register', (0, _passport.master)(), (0, _chocomen.middleware)(_model.schemaUser.creation), _controller["default"].create);
/**
 * @swagger
 *  /auth:
 *    post:
 *      tags:
 *      - "auth"
 *      summary: "Authenticate"
 *      parameters:
 *      - name: Authorization
 *        in: header
 *        description: an authorization header
 *        required: true
 *        type: json
 *      security:
 *      - basicAuth: []
 *      responses:
 *        200:
 *          description: "token User `access_token` to be passed to other requests"
 *        403:
 *          description: "401 Invalid credentials"
 */

router.post('/', (0, _passport.password)(), _controller2.login); // router.post('/', () => {}, login);
// /**
//  * @api {get} /auth/checkJWT Check JWT Validity
//  * @apiName Check JWT Validity
//  * @apiGroup Auth
//  * @apiPermission token
//  * @apiParam {String} access_token access_token.
//  * @apiSuccess (Success 200) {String} result OK
//  * @apiError 401 Invalid token.
//  **/
// router.get('/checkJWT', token({ required: true }), checkJWT);
// /**
//  * @api {get} /auth/renewJWT Renew JWT
//  * @apiName Renew JWT
//  * @apiGroup Auth
//  * @apiPermission token
//  * @apiParam {String} access_token access_token.
//  * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
//  * @apiSuccess (Success 201) {User} user Current user's data.
//  * @apiError 401 Invalid token.
//  **/
// router.get('/renewJWT', token({ required: true }), login);

var _default = router;
exports["default"] = _default;