const express = require("express");
const { pagesRead, schemapagesRead } = require("./model"); // new
const router = express.Router();
const { validateSchema } = require("../../services/vinciGenerator");
const sendmail = require("sendmail")(); //TODO pass inside of utils
const { smokeCollectorNotifyFailsCases } = require("../../config");
const { default: logger } = require("../../services/logger");
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

/**
 * @swagger
 *  /pagesRead:
 *    get:
 *      tags:
 *      - "pagesRead"
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

router.get("/", async (req, res) => {
  logger.info(" Get all smoke");
  logger.info(req.body);
  const pagesReads = await pagesRead.find();
  logger.info("Read all pagesRead cases");
  res.send(pagesReads);
});

/**
 * @swagger
 *  /pagesRead:
 *    post:
 *      tags:
 *      - "pagesRead"
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

router.post("/", async (req, res) => {
  //! Validate if Schema data exit.

  await validateSchema(req.body, schemapagesRead);

  logger.warn(req.body);
  logger.info("save data: " + JSON.stringify(req.body));

  const pagesRead = await new pagesRead(req.body);

  await pagesRead.save();

  let pagesRead2 = await pagesRead.findOne(pagesRead);

  logger.info(pagesRead2);

  await res.send(pagesRead2);

  logger.warn(
    "If exist fail send notification to:" + smokeCollectorNotifyFailsCases
  );

  try {
    if (!req.body.passTest && smokeCollectorNotifyFailsCases) {
      //TODO add this inside of the utils
      logger.info("📦 🔥 💨 Notify of Fails cases");
      logger.info("Notify To: " + smokeCollectorNotifyFailsCases);

      sendmail(
        {
          from: "no-reply@smokecollector.com",
          to: smokeCollectorNotifyFailsCases,
          subject: "🔥 💨 SmokeTest Fail " + req.body.projectName,
          html: JSON.stringify(req.body),
        },
        function (err, reply) {
          logger.info("Was send the email");
          console.log(err && err.stack);
          console.dir(reply);
        }
      );
    }
  } catch (error) {
    logger.error(error.message);
  }
});

// curl http://localhost:5000/api/pagesReads \
//     -X pagesRead \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"pagesRead 1", "context":"Lorem ipsum"}'

router.get("/pagesReads/:id", async (req, res) => {
  const pagesRead = await pagesRead.findOne({ _id: req.params.id });

  res.send(pagesRead);
});

// curl http://localhost:5000/api/pagesReads/<OBJECT_ID>
// curl http://localhost:5000/api/pagesReads/60ccf14b8e95302f0e99295f

router.get("/pagesReads/:id", async (req, res) => {
  try {
    const pagesRead = await pagesRead.findOne({ _id: req.params.id });
    res.send(pagesRead);
  } catch {
    res.status(404);
    res.send({ error: "pagesRead doesn't exist!" });
  }
});

export default router;
