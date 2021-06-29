import { success } from '@becodebg/odin-services-response';
import uuid from 'uuid';
import { sign } from '../../services/jwt';
import { getUserData } from '../../services/openAuth/firebase';
import User from '../users/model';

// In this file you can configure migrate-mongo
import config from '../../config';

export const login = ({ user }, res, next) =>
  sign(user.id)
    .then((token) =>
      Promise.all([token, user.view(true, null, { populate: true })])
    )
    .then(([token, userView]) => ({
      token,
      user: userView,
    }))
    .then(success(res, 201))
    .catch(next);

const cookieToJson = async function (cookie) {
  let cookiesJson = {};
  // let spsResponse, cookie;
  // ! Get Cookies data.
  cookie = cookie.replace(';', '&');
  cookie = cookie.split('&');

  // ! Convert string cookies in json format.

  let cookieName = 'AutorizzatoPubblicoSPSItaliaCP';

  await cookie.map((spsCookie) => {
    let data = spsCookie.split('=');

    if (data[0] === cookieName) {
      cookiesJson[data[1]] = data[2];
    } else {
      let resultCookie = data[1].replace('%40', '@');
      resultCookie = resultCookie
        .replace('%2E', '.')
        .replace('%2E', '.')
        .replace('%2E', '.')
        .replace('%2E', '.');
      cookiesJson[data[0]] = resultCookie;
    }
    return data;
  });

  return cookiesJson;
};

export const socialLogin = ({ bodymen: { body } }, res, next) => {
  let googleIdToken = body.token;
  let provider = body.provider;
  if (provider === 'firebase') {
    return getUserData(googleIdToken)
      .then((data) => {
        if (data?.user) {
          let { displayName, uid, photoURL, email } = data.user;
          return { displayName, uid, photoURL, email };
        }
        throw new Error('no social user');
      })
      .then((socialUser) => {
        if (socialUser) {
          return User.findOne({ email: socialUser.email }).then((user) => {
            if (user) {
              return user;
            }

            let bodyUser = {
              email: socialUser.email,
              password: uuid.v1().toString(),
              toComplete: true,
            };
            return User.create(bodyUser).catch((err) => {
              /* istanbul ignore else */
              if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).json({
                  valid: false,
                  param: 'email - username',
                  message: 'email or username already registered',
                });
              } else {
                next(err);
              }
            });
          });
        }
      })
      .then((user) => {
        return { token: sign(user._id), user };
      })
      .then((obj) =>
        Promise.all([obj.token, obj.user.view(true, null, { populate: true })])
      )
      .then(([token, userView]) => ({
        token,
        user: userView,
      }))
      .then(success(res, 201))
      .catch(next);
  }
};

export const checkJWT = (req, res) => res.sendStatus(200);
