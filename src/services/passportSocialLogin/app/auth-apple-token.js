const passport = require("passport");
const AppleStrategy = require("passport-apple-token");

passport.use(
  new AppleStrategy(
    {
      clientID: "com.example.account", // Services ID
      teamID: "1234567890", // Team ID of your Apple Developer Account
      keyID: "ABCDEFGHIJ", // Key ID, received from https://developer.apple.com/account/resources/authkeys/list
      key: fs.readFileSync(path.join("path", "to", "AuthKey_XYZ1234567.p8")), // Private key, downloaded from https://developer.apple.com/account/resources/authkeys/list
      scope: ["name", "email"],
      callbackURL: "https://example.com/auth/apple/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
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
        avatarUrl: profile.photos[0].value,
      };

      console.log(">>>>>1856926627>>>>>");
      console.log(bodyUser);
      console.log("<<<<<<<<<<<<<<<<<<<");

      return done(null, bodyUser);
    }
  )
);
