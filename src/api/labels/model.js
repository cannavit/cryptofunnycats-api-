const mongoose = require('mongoose');

const schemaLabel = mongoose.Schema({
  title: String,
  content: String,
});

module.exports = mongoose.model('label', schemaLabel);
