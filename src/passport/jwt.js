import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import config from '../utils/config.js';
import { getUserByID } from '../persistance/daos/mongodb/userDaoMongo.js';
import { logger } from "../utils/logger.js";

const logError = (error) => {
  logger.error ('Error jwt:', error);
throw error;
};

const cookieExtractor = (req) => req.cookies.token;

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: config.auth.SECRET_KEY_JWT
};

const verifyToken = async (jwtPayload, done) => {
  try {
    const user = await getUserByID(jwtPayload.userId);
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    logError(error);
  }
};

passport.use('jwt', new JwtStrategy(strategyOptions, verifyToken));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserByID(id);
    return user ? done(null, user) : done(null, false);
  } catch (error) {
    logError(error);
  }
});
