"use strict";

// https://www.passportjs.org/packages/passport-google-oauth2/
var passport = require("passport");

var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
}, function (accessToken, refreshToken, profile, cb) {
  //TODO Connect to DB
  console.log(">>>>>-1057171645>>>>>");
  console.log(profile);
  console.log("<<<<<<<<<<<<<<<<<<<"); //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
  //     return cb(err, user);
  //   });

  return done(null, profile);
}));
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
}); // [POST]/baseURL/login-social
// {
//     social: "google",
//     response: {
//         idToken: string,
//         serverAuthCode: string,
//         scopes: [], // on iOS this is empty array if no additional scopes are defined
//         user: {
//           email: string,
//           id: string,
//           givenName: string,
//           familyName: string,
//           photo: string, // url
//           name: string // full name
//     }
// }