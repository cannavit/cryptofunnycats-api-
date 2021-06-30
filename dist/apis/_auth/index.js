"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chocomen = require("@becodebg/chocomen");

var _express = require("express");

var _passport = require("../../services/passport");

var _controller = require("../_users/controller");

var _controller2 = require("./controller");

var _model = require("../_users/model");

//TODO refactoring
var router = new _express.Router();
/**
 * @api {post} /auth/register Register an user
 * @apiGroup Auth
 * @apiName Register
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiSuccess (Success 201) {User} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 403 Forbidden operation.
 * @apiError 409 Email already registered.
 **/

router.post('/register', (0, _passport.master)(), (0, _chocomen.middleware)(_model.bodymenSchema.creation), _controller.actions.create);
/**
 * @api {post} /auth Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiPermission basic
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid credentials.
 **/

router.post('/', (0, _passport.password)(), _controller2.login);
/**
 * @api {get} /auth/checkJWT Check JWT Validity
 * @apiName Check JWT Validity
 * @apiGroup Auth
 * @apiPermission token
 * @apiParam {String} access_token access_token.
 * @apiSuccess (Success 200) {String} result OK
 * @apiError 401 Invalid token.
 **/

router.get('/checkJWT', (0, _passport.token)({
  required: true
}), _controller2.checkJWT);
/**
 * @api {get} /auth/renewJWT Renew JWT
 * @apiName Renew JWT
 * @apiGroup Auth
 * @apiPermission token
 * @apiParam {String} access_token access_token.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid token.
 **/

router.get('/renewJWT', (0, _passport.token)({
  required: true
}), _controller2.login);
/**
 * @api {post} /auth/spsAuthentication Authenticate using cookies
 * @apiName spsAuthentication
 * @apiGroup Auth
 * @apiParam {String} access using cookies from the site https://www.spsitalia.it/redazione/.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {User} user Current user's data.
 * @apiError 401 Invalid credentials.
 **/

router.post('/spsAuthentication', (0, _chocomen.middleware)({
  cookies: _model.schema.tree.cookies
}), _controller2.spsLogin);
var _default = router;
exports["default"] = _default;