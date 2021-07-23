"use strict";

var mongoose = require("mongoose");

var schemacertifiedTemplates = mongoose.Schema({
  dataSource: String,
  dataType: String,
  templateName: String,
  namespace: String,
  objects: String,
  testId: String,
  templateJson: String,
  templateYaml: Boolean
});
module.exports.certifiedTemplates = mongoose.model("certifiedTemplates", schemacertifiedTemplates);
module.exports.schemacertifiedTemplates = schemacertifiedTemplates;