const passportCustom = require("passport-custom");
const CustomStrategy = passportCustom.Strategy;
const passport = require("passport");
const axios = require("axios");

passport.use(
  "googleCustomToken",
  new CustomStrategy(async function (req, done, next) {
    if (!req.body.access_token) {
      return done(null, false);
    }

    try {
      let response = await axios({
        method: "post",
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        data: {},
        headers: { Authorization: req.body.access_token },
      }); //?

      if (response.data.email_verified) {
        let profile = response.data;

        let bodyUser = {
          type: "Client",
          isConfirmed: true,
          isActive: true,
          isDeactivated: false,
          nickname: profile.name,
          realname: profile.name,
          email: profile.email,
          password: "9F2C926BC03AA29E62CC",
          socialLogin: true,
          socialLoginProvider: "google-provider",
          yearOfBirth: undefined,
          state: undefined,
          city: undefined,
          avatarUrl: profile.picture,
        };

        return done(null, bodyUser);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(error.message);
      return done(null, false);
    }
  })
);
