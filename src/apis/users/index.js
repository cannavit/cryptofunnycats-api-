const express = require('express');
import { user, schemaUser } from './model'; // new

const router = express.Router();
// const { validateSchema } = require('../../services/vinciGenerator');
// const sendmail = require('sendmail')(); //TODO pass inside of utils
// const { smokeCollectorNotifyFailsCases } = require('../../config');
// const { default: logger } = require('../../services/logger');
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

// import { middleware as body } from '@becodebg/chocomen';
import { Router } from 'express';
// import { middleware as query } from 'querymen';

import actions from './controller';

import { admin, password, token, master } from '../../services/passport';

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
router.get('/', (req, res, next)=> {
  next();
}, actions.getAll);

// /** //  * @api {get} /users/me Retrieve current user
//  * @apiGroup User
//  * @apiName RetrieveCurrent
//  * @apiPermission user
//  * @apiSuccess {User} user User's data.
//  **/

// router.get('/me', token({ required: true }), actions.showMe);

export default router;
