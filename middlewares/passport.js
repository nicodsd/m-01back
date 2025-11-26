import passport from "passport";
import passportJwt from "passport-jwt";
import User from "../models/User.js";
passport.initialize();
passport.session();
passport.use(
  new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY
  },
    async (jwt_payload, done) => {
      try {
        let user = await User.findOne({ email: jwt_payload.email });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
export default passport;