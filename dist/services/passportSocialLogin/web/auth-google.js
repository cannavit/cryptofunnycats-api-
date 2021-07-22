"use strict";

// https://www.passportjs.org/packages/passport-google-oauth2/
var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth2").Strategy; // https://cloud.google.com/endpoints/docs/openapi/authenticating-users-google-id


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
  console.log(">>>>>1165606669>>>>>");
  console.log(accessToken);
  console.log("<<<<<<<<<<<<<<<<<<<"); //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //     return done(err, user);
  //   });

  return done(null, profile);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});