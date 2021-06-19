import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';

import { env } from '../../config';

const roles = ['user', 'admin'];

export const deviceBodymenSchema =
  /**
   * @api {js} device DeviceSchema
   * @apiGroup User
   * @apiName DeviceSchema
   * @apiExample {js} Entity schema: */
  {
    os: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  };
/* **/

const deviceSchema = new Schema(deviceBodymenSchema, {
  _id: false,
  id: false,
});

let model =
  /**
   * @api {js} users Schema
   * @apiName Schema
   * @apiGroup User
   * @apiExample {js} Entity schema: */
  {
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      odinFrozenAfterCreation: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: roles,
      odinFrozenAfterCreation: true,
    },
    cpId: {
      // id database contact place
      type: String,
      odinReadonly: true,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    last_login: {
      type: Date,
    },
    pre_last_login: {
      type: Date,
    },
    devices: {
      type: [deviceSchema],
      default: [],
    },
    prefix: {
      type: String,
    },
    userProfile: {
      type: [Object],
      odinVirtual: true,
      odinVirtualPopulation: {
        odinAutoPopulation: true,
        options: {
          ref: 'userProfile',
          foreignField: 'userId',
          localField: '_id',
          justOne: false,
        },
      },
    },
  };
/* **/

export const schema = model.schema;

export default model;
