const mongoose = require('mongoose');

const schemaSmktest = mongoose.Schema({
  projectName: String,
  context: String,
  namespace: String,
  testName: String,
  testResult: String,
  testId: String,
  testDuration: Number,
  passTest: Boolean,
  GITLAB_USER_ID: String,
  CI_PROJECT_URL: String,
  CI_PROJECT_TITLE: String,
  CI_PROJECT_NAME: String,
  CI_PROJECT_ID: String,
  CI_PIPELINE_ID: String,
  CI_COMMIT_TAG: String,
  CI_COMMIT_REF_NAME: String,
  CI_COMMIT_SHA: String,
  CI_COMMIT_MESSAGE: String,
  CI_COMMIT_TITLE: String,
  GITLAB_USER_EMAIL: String,
});

module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;
