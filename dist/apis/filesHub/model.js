"use strict";

var mongoose = require("mongoose");

var schemafilesHub = mongoose.Schema({
  git_url: String,
  html_url: String,
  fileName: String,
  node_id: String,
  full_name: String,
  owner: String,
  description: String,
  query: String,
  dataSource: String,
  dataType: String,
  ownerType: String,
  url: String,
  commits_url: String,
  default_branch: String,
  language: String,
  fileContent: String,
  fileId: Number,
  stargazers_count: Number,
  watchers: Number,
  network_count: Number,
  subscribers_count: Number
});
module.exports.filesHub = mongoose.model("filesHub", schemafilesHub);
module.exports.schemafilesHub = schemafilesHub;