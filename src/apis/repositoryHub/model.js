const mongoose = require("mongoose");

const schemarepositoryHub = mongoose.Schema({
  git_url: String,
  html_url: String,
  fileName: String,
  node_id: String,
  full_name: String,
  owner: String,
  description: String,
  dataSource: String,
  dataType: String,
  ownerType: String,
  url: String,
  commits_url: String,
  default_branch: String,
  language: String,
  fileContent: String,
  repositoryId: Number,
  stargazers_count: Number,
  watchers: Number,
  network_count: Number,
  subscribers_count: Number,
  created_at: Date,
  updated_at: Date,
  pushed_at: Date,
});

module.exports.repositoryHub = mongoose.model(
  "repositoryHub",
  schemarepositoryHub
);
module.exports.schemarepositoryHub = schemarepositoryHub;
