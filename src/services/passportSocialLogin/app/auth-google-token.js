const passport = require("passport");
var GooglePlusTokenStrategy = require("passport-google-plus-token");

//! PASSPORT GOOGLE TOKEN STRATEGY --------- >>>
// BODY JSON GOOGLE TOKEN
// {
//   "access_token": "ya29.a0ARrdaM_6Wmud5gx3ZJ0FhHlv1akaElsO3l1hkdHG-_g38wZ6PAgk6I2ARgNXoV9mSyg2LKRwqZcWBgyPvW-XXAKwJcnbnEpndhVlJrO3J2LJ4k5On6Gb3hq9NqRzJ90-6aK6gWzLX-_C-z3605Lsu9cIr90p"
// }

passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      clientID: process.env.GOOGLE_TOKEN_CLIENT_ID,
      clientSecret: process.env.GOOGLE_TOKEN_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      //
      let bodyUser = {
        type: "Client",
        isConfirmed: true,
        isActive: true,
        isDeactivated: false,
        nickname: profile.displayName,
        realname: profile.displayName,
        email: profile.emails[0].value,
        password: "9F2C926BC03AA29E62CC",
        socialLogin: true,
        socialLoginProvider: profile.provider,
        yearOfBirth: undefined,
        state: undefined,
        city: undefined,
        avatarUrl: profile._json.image.url,
      };

      return done(null, bodyUser);
    }
  )
);
