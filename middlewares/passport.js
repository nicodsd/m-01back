import passportJwt from "passport-jwt";
import User from "../models/User.js";
import passport from "passport";
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};
passport.use(
  new passportJwt.Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async (jwt_payload, done) => {
      console.log(jwt_payload);
      try {
        const user = await User.findById(jwt_payload._id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
export default passport;