const express = require("express");
const { gitlabLogs, schemagitlabLogs } = require("./model"); // new
const router = express.Router();
const { validateSchema } = require("../../services/vinciGenerator");
const sendmail = require("sendmail")(); //TODO pass inside of utils
const { smokeCollectorNotifyFailsCases } = require("../../config");
const { default: logger } = require("../../services/logger");
// const { default: logger } = require('../../../src/services/logger');
// const logger = require('../../services/logger');

/**
 * @swagger
 *  /gitlabLogs:
 *    get:
 *      tags:
 *      - "gitlabLogs"
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
  const gitlabLogss = await gitlabLogs.find();
  logger.info("Read all gitlabLogs cases");
  res.send(gitlabLogss);
});

/**
 * @swagger
 *  /gitlabLogs:
 *    post:
 *      tags:
 *      - "gitlabLogs"
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

  await validateSchema(req.body, schemagitlabLogs);

  logger.warn(req.body);
  logger.info("save data: " + JSON.stringify(req.body));

  const gitlabLogs = await new gitlabLogs(req.body);

  await gitlabLogs.save();

  let gitlabLogs2 = await gitlabLogs.findOne(gitlabLogs);

  logger.info(gitlabLogs2);

  await res.send(gitlabLogs2);

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

// curl http://localhost:5000/api/gitlabLogss \
//     -X gitlabLogs \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"gitlabLogs 1", "context":"Lorem ipsum"}'

router.get("/gitlabLogss/:id", async (req, res) => {
  const gitlabLogs = await gitlabLogs.findOne({ _id: req.params.id });

  res.send(gitlabLogs);
});

// curl http://localhost:5000/api/gitlabLogss/<OBJECT_ID>
// curl http://localhost:5000/api/gitlabLogss/60ccf14b8e95302f0e99295f

router.get("/gitlabLogss/:id", async (req, res) => {
  try {
    const gitlabLogs = await gitlabLogs.findOne({ _id: req.params.id });
    res.send(gitlabLogs);
  } catch {
    res.status(404);
    res.send({ error: "gitlabLogs doesn't exist!" });
  }
});

export default router;
