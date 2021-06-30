"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mongoose = require('mongoose');

var roles = ['user', 'admin'];
var schemaUser = mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    "enum": roles,
    "default": 'user'
  },
  userName: {
    type: String
  },
  lastName: {
    type: String
  },
  isConfirmed: {
    type: Boolean,
    "default": false
  },
  isEnabled: {
    type: Boolean,
    "default": true
  },
  lastLogin: {
    type: Date
  },
  preLastLogin: {
    type: Date
  },
  prefix: {
    type: String
  }
});
var user = mongoose.model('user', schemaUser);
module.exports.user = user;
module.exports.schemaUser = schemaUser;
module.exports.schema = schemaUser;
var _default = user;
exports["default"] = _default;