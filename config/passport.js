import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User.js';

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    req => req?.cookies?.jwt || null
  ]),
  secretOrKey: process.env.JWT_SECRET || 'secretKey'
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

export default passport;
