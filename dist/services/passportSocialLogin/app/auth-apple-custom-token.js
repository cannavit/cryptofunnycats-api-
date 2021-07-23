"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var passportCustom = require('passport-custom');

var CustomStrategy = passportCustom.Strategy;

var passport = require('passport');

var axios = require('axios');

var logger = require('../../services/logger');

var querystring = require('querystring');

var jwt = require('jsonwebtoken');

var fs = require('fs');

var path = require('path'); // https://developer.okta.com/blog/2019/06/04/what-the-heck-is-sign-in-with-apple
// https://github.com/arjunkomath/sign-in-with-apple-js-node-example/blob/master/server.js


var getUserId = function getUserId(token) {
  var parts = token.split('.');

  try {
    return JSON.parse(new Buffer(parts[1], 'base64').toString('ascii'));
  } catch (e) {
    return null;
  }
};

var getClientSecret = function getClientSecret() {
  // sign with RSA SHA256
  var useAppleServerValidation = false;
  var privateKey = fs.readFileSync(process.env.APPLE_PRIVATE_KEY_FILE_PATH);
  var headers = {
    kid: process.env.APPLE_KEY_ID,
    typ: undefined // is there another way to remove type?

  };
  var claims = {
    iss: process.env.APPLE_TEAM_ID,
    aud: 'https://appleid.apple.com',
    sub: process.env.APPLE_CLIENT_ID
  };
  token = jwt.sign(claims, privateKey, {
    algorithm: 'ES256',
    header: headers,
    expiresIn: '16d'
  });
  return token;
};

passport.use('appleCustomToken', new CustomStrategy( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, done, next) {
    var useAppleServerValidation, clientSecret, response, requestBody, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Check if exist the data in the request
            useAppleServerValidation = false;

            if (req.body.code) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", done(null, false));

          case 3:
            clientSecret = getClientSecret();
            requestBody = {
              grant_type: 'authorization_code',
              code: req.body.code,
              client_id: process.env.APPLE_CLIENT_ID,
              client_secret: clientSecret,
              scope: 'email full_name',
              redirect_uri: 'https://stg.magibest.com'
            };
            console.log('>>>>>-1717319667 clientSecret >>>>>');
            console.log(requestBody);
            console.log('<<<<<<<<<<<<<<<<<<<');
            console.log('>>>>>-1158612948>>>>>');
            console.log();
            _context.next = 12;
            return getUserId('eyJraWQiOiI4NkQ4OEtmIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLm91dGZyb250Z2FtZXMubWFnaWJlc3QiLCJleHAiOjE2MjY4NjA2NDksImlhdCI6MTYyNjc3NDI0OSwic3ViIjoiMDAwMTQ5LjAwODQwNWM0ZDBlMjQ3NmU5YTgyOTg4ODg1ODBlNzJhLjE0NTYiLCJub25jZSI6ImNiNjg0N2I5YWMyOThiZmE4MjRkNDJiOTEzNGYxNmIzMjBmOWEwYjJjMThhY2ViOTcxZTU1MjQ3YjU4ZWFkNjIiLCJjX2hhc2giOiJNbEVJdUttVkl3SGp5VWJMaVZEYXRnIiwiZW1haWwiOiJjaHJpc3RpYW5hcmR1aW5vM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2MjY3NzQyNDksIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.LFAEZcMKoCyfO63FxePNWnE9ZggmdL_a9EFU_XdcqCeNdP4P7DonSC5FeTMi42ZNC8-bcThcKqLWy_ZaAbcREk2HUgNs1o4N2pmLvDiBkEMur8IylIfeCKJWXs8OIi0_J3DUfADijEfWONWcU2xNcs-qtrcBEX_6eSkuj8am4F_6WSzoL7yzztGhJL0y-EGT1SVMOFgikRNS5b0A8WX45IB3Z8fpVcfOoUqWyzhGsB3_MA_16xnfDEMSawEf-VrZyZvkaha1fzkmDsORCPfWkB6TbJE1bU8RZw4-7I3r9E3bkPFkWLtt-K4tu0SNA7CZi8PHWIv2lR58YXOWdFY5CA');

          case 12:
            user = _context.sent;
            console.log('>>>>>120277378>>>>>');
            console.log(user);
            console.log('<<<<<<<<<<<<<<<<<<<');
            console.log('<<<<<<<<<<<<<<<<<<<');
            _context.prev = 17;
            _context.next = 20;
            return axios({
              method: 'post',
              url: 'https://appleid.apple.com/auth/token',
              data: querystring.stringify(requestBody),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });

          case 20:
            response = _context.sent;
            _context.next = 29;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](17);
            response = _context.t0.response;
            logger.info(module, JSON.stringify({
              error: _context.t0.message,
              errorApple: _context.t0.response.data,
              statusCode: _context.t0.request.statusCode
            }));
            response = {
              data: response.data,
              statusCode: response.status,
              error: _context.t0.message
            };
            return _context.abrupt("return", done(null, false));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[17, 23]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}())); // curl -v POST "https://appleid.apple.com/auth/token" \
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