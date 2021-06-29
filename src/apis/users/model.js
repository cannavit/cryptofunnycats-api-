const mongoose = require('mongoose');


const roles = ['user', 'admin']



const schemauser = mongoose.Schema({
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: roles,
  },
  userName: {
  type: String,
  },
  lastName: {
  type: String,
  },  
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  preLastLogin: {
    type: Date,
  },
  prefix: {
    type: String,
  },
});

module.exports.user = mongoose.model('user', schemauser);
module.exports.schemauser = schemauser;
