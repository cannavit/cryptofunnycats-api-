// Documentation: https://www.passportjs.org/
const passport = require("passport");

//! IMPORT APPS WITH TOKEN ACCESS
require("./app/auth-google-token");
require("./app/auth-facebook-token");

const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", {
  session: false,
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

module.exports.passportGoogle = passportGoogle;
module.exports.passportFacebook = passportFacebook;
