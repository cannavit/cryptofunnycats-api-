import mongoose, { Schema } from "mongoose";

const schemafilesHubCommit = mongoose.Schema({
  fileHubId: {
    type: Schema.ObjectId,
  },
  shaCommit: String,
  authorCommit: String,
  emailCommit: String,
  dateCommit: String,
  messageCommit: String,
  bugWordCommit: Boolean,
  messageFeelingScore: String,
  messageFeelingComparative: String,
  urlCommit: String,
  sha: String,
  filename: String,
  status: String,
  additions: String,
  deletions: String,
  changes: String,
  blob_url: String,
  raw_url: String,
  contents_url: String,
  patch: String,
});

module.exports.filesHubCommit = mongoose.model(
  "filesHubCommit",
  schemafilesHubCommit
);
module.exports.schemafilesHubCommit = schemafilesHubCommit;
