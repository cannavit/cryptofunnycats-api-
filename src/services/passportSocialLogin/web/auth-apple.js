// https://www.passportjs.org/packages/passport-google-oauth2/

const passport = require('passport');
const AppleStrategy = require('passport-apple');

console.log('>>>>>-1667078049>>>>>');
console.log(process.env.APPLE_CLIENT_ID);
console.log('<<<<<<<<<<<<<<<<<<<');

passport.use(
  new AppleStrategy(
    {
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      callbackURL: 'https://stg.magibest.com',
      keyID: process.env.APPLE_KEY_ID,
      privateKeyLocation: './auth-apple.p8',
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, idToken, profile, cb) {
      console.log('>>>>>2110603690>>>>>');
      console.log(profile);
      console.log('<<<<<<<<<<<<<<<<<<<');
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
