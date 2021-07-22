"use strict";

// Documentation: https://www.passportjs.org/
var passport = require("passport"); //! IMPORT APPS WITH TOKEN ACCESS


require("./app/auth-google-token");

require("./app/auth-facebook-token");

var passportGoogle = passport.authenticate("googleToken", {
  session: false
});
var passportFacebook = passport.authenticate("facebookToken", {
  session: false
});
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
module.exports.passportGoogle = passportGoogle;
module.exports.passportFacebook = passportFacebook;