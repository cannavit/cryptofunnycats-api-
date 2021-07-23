"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mongoose$Schema;

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
}, (0, _defineProperty2["default"])(_mongoose$Schema, "GITLAB_USER_ID", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_LOGIN_CURL", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_SWAGGER_APIS", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_SWAGGER_PUBLIC_APIS", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_VOLUMES", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CREATE_CONFIG_FILE", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_PODS_LOGS", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_CONDITIONS", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_INGRESS", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_NAMESPACE", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_AUTO_DETECT", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_SCANNER_LOGIN", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CURL_LOGIN", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_SCANNER_API_METHOD", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CRITERIAL", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_ASSERT_CURL", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_CONTEXT", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_ENVIRONMENT", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_ENVIRONMENT_VARIABLE", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_PROJECT_NAME", String), (0, _defineProperty2["default"])(_mongoose$Schema, "SMKTEST_SKIP_PROMPTS", String), _mongoose$Schema));
module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;