import passport from 'passport';
import localStrategy from 'passport-local';
import User from '../../apis/users';
import { password } from './index copy';

passport.use(
  'signup',
  new localStrategy({
    usernameField: 'email',
    passportField: 'password',
  }),
  async (email, password, done) => {
    try {
      const user = await User.create({
        email,
        password,
      });
      return done(null, user);
    } catch (error) {
      done(e);
    }
  }
);
