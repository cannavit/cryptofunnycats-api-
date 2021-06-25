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
  SMKTEST_CHECK_LOGIN_CURL: String,
  SMKTEST_CHECK_SWAGGER_APIS: String,
  SMKTEST_CHECK_SWAGGER_PUBLIC_APIS: String,
  SMKTEST_CHECK_VOLUMES: String,
  SMKTEST_CREATE_CONFIG_FILE: String,
  SMKTEST_CHECK_PODS_LOGS: String,
  SMKTEST_CHECK_CONDITIONS: String,
  SMKTEST_CHECK_INGRESS: String,
  SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE: String,
  SMKTEST_NAMESPACE: String,
  SMKTEST_AUTO_DETECT: String,
  SMKTEST_SCANNER_LOGIN: String,
  SMKTEST_CURL_LOGIN: String,
  SMKTEST_SCANNER_API_METHOD: String,
  SMKTEST_CRITERIAL: String,
  SMKTEST_ASSERT_CURL: String,
  SMKTEST_CONTEXT: String,
  SMKTEST_ENVIRONMENT: String,
  SMKTEST_ENVIRONMENT_VARIABLE: String,
  SMKTEST_PROJECT_NAME: String,
  SMKTEST_SKIP_PROMPTS: String,
});

module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;
