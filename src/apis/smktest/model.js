const mongoose = require('mongoose');

const schemaSmktest = mongoose.Schema({
  projectName: String,
  context: String,
  namespace: String,
  assertCurl: String,
  swaggerUrl: String,
  checkIngress: Boolean,
  checkConditions: Boolean,
  checkIfAllPodsAreActive: Boolean,
  checkPodsLogs: Boolean,
  createConfigFile: Boolean,
  checkSwaggerPublicsApis: String,
  passTest: Boolean,
  testOutputTest: String,
});

module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;
