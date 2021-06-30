"use strict";

var _mongoose$Schema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var schemaSmktest = mongoose.Schema((_mongoose$Schema = {
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
  GITLAB_USER_EMAIL: String
}, _defineProperty(_mongoose$Schema, "GITLAB_USER_ID", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_LOGIN_CURL", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_SWAGGER_APIS", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_SWAGGER_PUBLIC_APIS", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_VOLUMES", String), _defineProperty(_mongoose$Schema, "SMKTEST_CREATE_CONFIG_FILE", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_PODS_LOGS", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_CONDITIONS", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_INGRESS", String), _defineProperty(_mongoose$Schema, "SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE", String), _defineProperty(_mongoose$Schema, "SMKTEST_NAMESPACE", String), _defineProperty(_mongoose$Schema, "SMKTEST_AUTO_DETECT", String), _defineProperty(_mongoose$Schema, "SMKTEST_SCANNER_LOGIN", String), _defineProperty(_mongoose$Schema, "SMKTEST_CURL_LOGIN", String), _defineProperty(_mongoose$Schema, "SMKTEST_SCANNER_API_METHOD", String), _defineProperty(_mongoose$Schema, "SMKTEST_CRITERIAL", String), _defineProperty(_mongoose$Schema, "SMKTEST_ASSERT_CURL", String), _defineProperty(_mongoose$Schema, "SMKTEST_CONTEXT", String), _defineProperty(_mongoose$Schema, "SMKTEST_ENVIRONMENT", String), _defineProperty(_mongoose$Schema, "SMKTEST_ENVIRONMENT_VARIABLE", String), _defineProperty(_mongoose$Schema, "SMKTEST_PROJECT_NAME", String), _defineProperty(_mongoose$Schema, "SMKTEST_SKIP_PROMPTS", String), _mongoose$Schema));
module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;