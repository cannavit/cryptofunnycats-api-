import mongoose from 'mongoose';

import User from './user';
import Message from './message';

const connectDb = () => {
  return mongoose.connect('mongodb://27.0.0.1:27017/messe-server-localhost');
};

const models = { User, Message };

export { connectDb };

export default models;
