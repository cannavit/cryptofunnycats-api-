const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const schemafilesHub = mongoose.Schema({
  repositoryId: {
    type: Schema.ObjectId,
  },
  full_name: String,
  familySha: String,
  familyUrl: String,
  sha: String,
  path: String,
  url: String,
  shaFile: String,
  decodeContent: String,
  fileType: String,
});

module.exports.filesHub = mongoose.model("filesHub", schemafilesHub);
module.exports.schemafilesHub = schemafilesHub;
