const express = require('express');
const { user, schemauser } = require('./model'); // new
const router = express.Router();
const { validateSchema } = require('../../services/vinciGenerator');
const sendmail = require('sendmail')(); //TODO pass inside of utils
const { smokeCollectorNotifyFailsCases } = require('../../config');
const { default: logger } = require('../../services/logger');
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

/**
 * @swagger
 *  /user:
 *    get:
 *      tags:
 *      - "user"
 *      summary: "get list of users"
 *      components:
 *        securitySchemes:
 *        bearerAuth:
 *          type: http
 *          escheme: bearer
 *          bearerFormat: JWT
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 */

router.get('/', async (req, res) => {
  const users = await user.find();
  logger.info('Read all user cases');
  res.send(users);
});


/**
 * @swagger
 *  /user:
 *    post:
 *      tags:
 *      - "user"
 *      summary: "Insert new users"
 *      parameters:
 *      - in: body 
 *        name: "email"
 *        description: "email user"
 *        example: jhon_941924939@test.com
 *      security:
 *      - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 *        403:
 *          description: "cannot create a new course limit was reached"
 */
router.post('/', async (req, res) => {
  //! Validate if Schema data exit.

  await validateSchema(req.body, schemauser);

  logger.warn(req.body);
  logger.info('save data: ' + JSON.stringify(req.body));

  const user = await new user(req.body);

  await user.save();

  let user2 = await user.findOne(user);

  logger.info(user2);

  await res.send(user2);

  logger.warn(
    'If exist fail send notification to:' + smokeCollectorNotifyFailsCases
  );

  try {
    if (!req.body.passTest && smokeCollectorNotifyFailsCases) {
      //TODO add this inside of the utils
      logger.info('📦 🔥 💨 Notify of Fails cases');
      logger.info('Notify To: ' + smokeCollectorNotifyFailsCases);

      sendmail(
        {
          from: 'no-reply@smokecollector.com',
          to: smokeCollectorNotifyFailsCases,
          subject: '🔥 💨 SmokeTest Fail ' + req.body.projectName,
          html: JSON.stringify(req.body),
        },
        function (err, reply) {
          logger.info('Was send the email');
          console.log(err && err.stack);
          console.dir(reply);
        }
      );
    }
  } catch (error) {
    logger.error(error.message);
  }
});

// curl http://localhost:5000/api/users \
//     -X user \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"user 1", "context":"Lorem ipsum"}'

router.get('/users/:id', async (req, res) => {
  const user = await user.findOne({ _id: req.params.id });

  res.send(user);
});

// curl http://localhost:5000/api/users/<OBJECT_ID>
// curl http://localhost:5000/api/users/60ccf14b8e95302f0e99295f

router.get('/users/:id', async (req, res) => {
  try {
    const user = await user.findOne({ _id: req.params.id });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "user doesn't exist!" });
  }
});


export default router