const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

// Load passport strategies
// Web strategies
require("./web/auth-google");
require("./web/auth-facebook");
// Apps strategies
require("./app/auth-google-token");
require("./app/auth-facebook-token");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(
    '<ol><li><a href="/auth/google">Authenticate with Google</a></li> <li><a href="/auth/facebook">Authenticate with Facebook</a></li></ol>'
  );
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.post(
  "/auth/facebook/callback",
  () => {
    console.log("@1Marker-No:_-960579088");
  }
  // passport.authenticate("facebook", {
  //   successRedirect: "/protected",
  //   failureRedirect: "/auth/facebook/failure",
  // })
);

app
  .route("/auth/google/token")
  .post(passport.authenticate("googleToken", { session: false }));

// BODY JSON GOOGLE TOKEN
// {
//   "access_token": "ya29.a0ARrdaM_6Wmud5gx3ZJ0FhHlv1akaElsO3l1hkdHG-_g38wZ6PAgk6I2ARgNXoV9mSyg2LKRwqZcWBgyPvW-XXAKwJcnbnEpndhVlJrO3J2LJ4k5On6Gb3hq9NqRzJ90-6aK6gWzLX-_C-z3605Lsu9cIr90p"
// }

app
  .route("/auth/facebook/token")
  .post(passport.authenticate("facebookToken", { session: false }));

app.get("/protected", isLoggedIn, (req, res) => {
  res.send({ dataUser: req.user });
});

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("Goodbye!");
});

app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

app.listen(5000, () => console.log("listening on port: 5000"));

// https://www.npmjs.com/package/passport-google-verify-token
