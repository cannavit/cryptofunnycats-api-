import logger from '../../services/logger';
import Entity from './model';

// Get all elements of the labels.

const getAll = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      let entityData = await Entity.find({});
      req.body = entityData;
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        data: req.body,
      });
    })
    .catch(next);
};

module.exports.getAll = getAll;

// Controller actions.create

const create = (req, res, next) => {
  return Promise.resolve()
    .then(async () => {
      logger.info('Create the new user ' + JSON.stringify(req.body));
      let entityData = await Entity.create(req.body);
      req.body = entityData;
    })
    .then(() => {
      res.status(200).json({
        status: 'success',
        data: req.body,
      });
    })
    .catch(next);
};

module.exports.create = create;
