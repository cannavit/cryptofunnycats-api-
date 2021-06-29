const express = require('express');
const { auth, schemaauth } = require('./model'); // new
const router = express.Router();
const { validateSchema } = require('../../services/vinciGenerator');
const sendmail = require('sendmail')(); //TODO pass inside of utils
const { smokeCollectorNotifyFailsCases } = require('../../config');
const { default: logger } = require('../../services/logger');
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

/**
 * @swagger
 *  /auth:
 *    get:
 *      tags:
 *      - "auth"
 *      summary: "get list of the test registered by smoke-master pipelines"
 *      components:
 *        securitySchemes:
 *        bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: "successful operation"
 */

router.get('/', async (req, res) => {
  const auths = await auth.find();
  logger.info('Read all auth cases');
  res.send(auths);
});

/**
 * @swagger
 *  /auth:
 *    post:
 *      tags:
 *      - "auth"
 *      summary: "Insert smoke-master results form remote pipeline"
 *      parameters:
 *      - in: body
 *        name: "roles"
 *        description: "pipeline data for save"
 *        example: {
 *           "projectName" : "smoke-master",
 *           "context": "kubernetes",
 *           "namespace": "smokeMaster-dev",
 *           "assertCurl": "true"
 *         }
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

  await validateSchema(req.body, schemaauth);

  logger.warn(req.body);
  logger.info('save data: ' + JSON.stringify(req.body));

  const auth = await new auth(req.body);

  await auth.save();

  let auth2 = await auth.findOne(auth);

  logger.info(auth2);

  await res.send(auth2);

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

// curl http://localhost:5000/api/auths \
//     -X auth \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"auth 1", "context":"Lorem ipsum"}'

router.get('/auths/:id', async (req, res) => {
  const auth = await auth.findOne({ _id: req.params.id });

  res.send(auth);
});

// curl http://localhost:5000/api/auths/<OBJECT_ID>
// curl http://localhost:5000/api/auths/60ccf14b8e95302f0e99295f

router.get('/auths/:id', async (req, res) => {
  try {
    const auth = await auth.findOne({ _id: req.params.id });
    res.send(auth);
  } catch {
    res.status(404);
    res.send({ error: "auth doesn't exist!" });
  }
});

// module.exports = router;

export default router