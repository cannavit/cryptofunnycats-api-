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
});

module.exports.Smktest = mongoose.model('smktest', schemaSmktest);
module.exports.schemaSmktest = schemaSmktest;
