import uuid from 'uuid';
import { sign } from '../../services/jwt';
import user from '../users/model';

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

export const checkJWT = (req, res) => res.sendStatus(200);
