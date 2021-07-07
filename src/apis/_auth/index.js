import { middleware as body } from '@becodebg/chocomen';
import { Router } from 'express';

import { master, password, token } from '../../services/passport';
import actions from '../users/controller';
import { login, checkJWT } from './controller';
import { user, schemaUser } from '../users/model';

const router = new Router();

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
router.post('/register', master(), body(schemaUser.creation), actions.create);

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
router.post('/', password(), login);
// router.post('/', () => {}, login);

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

export default router;
