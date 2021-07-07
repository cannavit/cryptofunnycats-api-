const express = require('express');
import { user, schemaUser } from './model';
import { middleware as body } from '@becodebg/chocomen';

// const router = express.Router();
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

const router = new Router();

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

router.get('/', master(), actions.getAll);

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

router.post('/', master(), body(schemaUser.creation), actions.create);

export default router;
