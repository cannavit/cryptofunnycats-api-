import mongoose, { Schema } from "mongoose";

const schemafilesHubCommit = mongoose.Schema({
  fileHubId: {
    type: Schema.ObjectId,
  },
  shaCommit: String,
  path: String,
  full_name: String,
  fileType: String,
  commiterEmail: String,
  commiterDate: String,
  message: String,
  commentCount: Number,
  isBugCommit: Boolean,
  messageFeelingScore: Number,
  messageFeelingComparative: Number,
});

module.exports.filesHubCommit = mongoose.model(
  "filesHubCommit",
  schemafilesHubCommit
);
module.exports.schemafilesHubCommit = schemafilesHubCommit;
