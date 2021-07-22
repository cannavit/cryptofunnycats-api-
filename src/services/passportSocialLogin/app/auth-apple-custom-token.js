const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;
const passport = require('passport');
const axios = require('axios');
const logger = require('../../services/logger');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple
// https://github.com/arjunkomath/sign-in-with-apple-js-node-example/blob/master/server.js

const getUserId = (token) => {
  const parts = token.split('.');
  try {
    return JSON.parse(new Buffer(parts[1], 'base64').toString('ascii'));
  } catch (e) {
    return null;
  }
};

const getClientSecret = () => {
  // sign with RSA SHA256
  let useAppleServerValidation = false;

  const privateKey = fs.readFileSync(process.env.APPLE_PRIVATE_KEY_FILE_PATH);

  const headers = {
    kid: process.env.APPLE_KEY_ID,
    typ: undefined, // is there another way to remove type?
  };
  const claims = {
    iss: process.env.APPLE_TEAM_ID,
    aud: 'https://appleid.apple.com',
    sub: process.env.APPLE_CLIENT_ID,
  };

  token = jwt.sign(claims, privateKey, {
    algorithm: 'ES256',
    header: headers,
    expiresIn: '16d',
  });

  return token;
};

passport.use(
  'appleCustomToken',
  new CustomStrategy(async function (req, done, next) {
    // Check if exist the data in the request
    let useAppleServerValidation = false;

    if (!req.body.code) {
      return done(null, false);
    }

    const clientSecret = getClientSecret();
    let response;

    const requestBody = {
      grant_type: 'authorization_code',
      code: req.body.code,
      client_id: process.env.APPLE_CLIENT_ID,
      client_secret: clientSecret,
      scope: 'email full_name',
      redirect_uri: 'https://stg.magibest.com',
    };

    console.log('>>>>>-1717319667 clientSecret >>>>>');
    console.log(requestBody);
    console.log('<<<<<<<<<<<<<<<<<<<');

    console.log('>>>>>-1158612948>>>>>');
    console.log();
    let user = await getUserId(
      'eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm91dGZyb250Z2FtZXMubWFnaWJlc3QiLCJleHAiOjE2MjY4NjA2NDksImlhdCI6MTYyNjc3NDI0OSwic3ViIjoiMDAwMTQ5LjAwODQwNWM0ZDBlMjQ3NmU5YTgyOTg4ODg1ODBlNzJhLjE0NTYiLCJub25jZSI6ImNiNjg0N2I5YWMyOThiZmE4MjRkNDJiOTEzNGYxNmIzMjBmOWEwYjJjMThhY2ViOTcxZTU1MjQ3YjU4ZWFkNjIiLCJjX2hhc2giOiJNbEVJdUttVkl3SGp5VWJMaVZEYXRnIiwiZW1haWwiOiJjaHJpc3RpYW5hcmR1aW5vM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2MjY3NzQyNDksIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.LFAEZcMKoCyfO63FxePNWnE9ZggmdL_a9EFU_XdcqCeNdP4P7DonSC5FeTMi42ZNC8-bcThcKqLWy_ZaAbcREk2HUgNs1o4N2pmLvDiBkEMur8IylIfeCKJWXs8OIi0_J3DUfADijEfWONWcU2xNcs-qtrcBEX_6eSkuj8am4F_6WSzoL7yzztGhJL0y-EGT1SVMOFgikRNS5b0A8WX45IB3Z8fpVcfOoUqWyzhGsB3_MA_16xnfDEMSawEf-VrZyZvkaha1fzkmDsORCPfWkB6TbJE1bU8RZw4-7I3r9E3bkPFkWLtt-K4tu0SNA7CZi8PHWIv2lR58YXOWdFY5CA'
    );

    console.log('>>>>>120277378>>>>>');
    console.log(user);
    console.log('<<<<<<<<<<<<<<<<<<<');
    console.log('<<<<<<<<<<<<<<<<<<<');
    try {
      response = await axios({
        method: 'post',
        url: 'https://appleid.apple.com/auth/token',
        data: querystring.stringify(requestBody),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (error) {
      response = error.response;
      logger.info(
        module,
        JSON.stringify({
          error: error.message,
          errorApple: error.response.data,
          statusCode: error.request.statusCode,
        })
      );

      response = {
        data: response.data,
        statusCode: response.status,
        error: error.message,
      };
      return done(null, false);
    }

    // return res.json({
    //   success: true,s
    //   data: response.data
    // })

    // return res.status(500).json({
    //   success: false,
    //   error: error.response.data
    // })

    // if (response.data.email_verified) {
    //   let profile = response.data;

    //   let bodyUser = {
    //     type: "Client",
    //     isConfirmed: true,
    //     isActive: true,
    //     isDeactivated: false,
    //     nickname: profile.name,
    //     realname: profile.name,
    //     email: profile.email,
    //     password: "9F2C926BC03AA29E62CC",
    //     socialLogin: true,
    //     socialLoginProvider: "google-provider",
    //     yearOfBirth: undefined,
    //     state: undefined,
    //     city: undefined,
    //     avatarUrl: profile.picture,
    //   };

    //   return done(null, bodyUser);
    // } else {
    //   return done(null, false);
    // }
    // } catch (error) {
    //   console.log(error.message);
    //   return done(null, false);
    // }
  })
);

// curl -v POST "https://appleid.apple.com/auth/token" \
// -H 'content-type: application/x-www-form-urlencoded' \
// -d 'client_id=com.magibest.client' \
// -d 'client_secret=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiIyMzM1SjU0UDNLIiwiYXVkIjoiaHR0cHM6Ly9hcHBsZWlkLmFwcGxlLmNvbSIsInN1YiI6ImNvbS5tYWdpYmVzdFwiICMgU2VydmljZXMgSUQiLCJpYXQiOjE2MjY3MDI5NjQsImV4cCI6MTYyODA4NTM2NH0.5QDFxTc9HRox4E5qujoNUtH3FqBLEyQep5aurYjXtbTK_Dwfsq0bbc2bwQpQKKmtz8VEzO03hr-lvBtZnsh_pQ' \
// -d 'code=c58c96cf28ae14535851012a1e4332e52.0.rruz.KdAUQKJGiQyOVwuTOUtwog' \
// -d 'grant_type=authorization_code'

// curl -v POST "https://appleid.apple.com/auth/token" \
// -H 'content-type: application/x-www-form-urlencoded' \
// -d 'client_id=com.magibest.client' \
// -d 'client_secret=eyJraWQiOiJUVDdSUzZRSDNIIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiIyMzM1SjU0UDNLIiwiaWF0IjoxNjI2NzAwOTU5LCJleHAiOjE2NDIyNTI5NTksImF1ZCI6Imh0dHBzOi8vYXBwbGVpZC5hcHBsZS5jb20iLCJzdWIiOiJjb20ubWFnaWJlc3QifQ.HBGbog1tnaq6x4AuoMt_au5iP77Fbkd6U45ooroNKeYxxtHgE-Ox56APAO3_QTy7Czq6Q-BomX0brt3NRcm_fA' \
// -d 'grant_type=authorization_code'

// curl -v POST "https://appleid.apple.com/auth/authorize" \
