const mongoose = require('mongoose');
const { roundsBcrypt } = require('../../config');
const mongooseHidden = require('mongoose-hidden')();

const roles = ['user', 'admin'];

const schemaUser = mongoose.Schema({
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
    bcrypt: true,
    hide: true,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  userName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthDay: {
    type: Date,
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

//! Add Plugins.
schemaUser.plugin(require('mongoose-bcrypt'), { rounds: roundsBcrypt });
schemaUser.plugin(mongooseHidden);

const user = mongoose.model('user', schemaUser);
module.exports.user = user;
module.exports.schemaUser = schemaUser;
module.exports.schema = schemaUser;

export default user;
