const express = require('express');
const { Smktest, schemaSmktest } = require('./model'); // new
const router = express.Router();
const { validateSchema } = require('../../services/vinciGenerator');

/**
 * @swagger
 *  /smktest:
 *    get:
 *      tags:
 *      - "smktest"
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
  const smktests = await Smktest.find();

  res.send(smktests);
});

/**
 * @swagger
 *  /smktest:
 *    post:
 *      tags:
 *      - "smktest"
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

  await validateSchema(req.body, schemaSmktest);

  const smktest = await new Smktest(req.body);

  await smktest.save();

  res.send(smktest);
});

// curl http://localhost:5000/api/smktests \
//     -X smktest \
//     -H "Content-Type: application/json" \
//     -d '{"projectName":"smktest 1", "context":"Lorem ipsum"}'

router.get('/smktests/:id', async (req, res) => {
  const smktest = await Smktest.findOne({ _id: req.params.id });

  res.send(smktest);
});

// curl http://localhost:5000/api/smktests/<OBJECT_ID>
// curl http://localhost:5000/api/smktests/60ccf14b8e95302f0e99295f

router.get('/smktests/:id', async (req, res) => {
  try {
    const smktest = await Smktest.findOne({ _id: req.params.id });
    res.send(smktest);
  } catch {
    res.status(404);
    res.send({ error: "Smktest doesn't exist!" });
  }
});

module.exports = router;
