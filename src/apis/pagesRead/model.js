import mongoose, { Schema } from "mongoose";

const schemapagesRead = mongoose.Schema({
  pages: Number,
  per_page: Number,
  reference: String,
});

module.exports.pagesRead = mongoose.model("pagesRead", schemapagesRead);
module.exports.schemapagesRead = schemapagesRead;
