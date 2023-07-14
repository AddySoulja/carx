import dotenv from "dotenv";
import passportJwt from "passport-jwt";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";
const JwtStrategy = passportJwt.Strategy;
dotenv.config();

const jwtOptions = {
  jwtFromRequest: function (req) {
    var token = null;
    if (req && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1].split("=")[1];
    }
    return token;
  },
  secretOrKey: process.env.JWT_SECRET,
};

export const configPass = (passport) =>
  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId);
        if (user)
          return done(false, {
            _id: user._id,
            username: user.username,
            email: user.email,
            photo: user.photo,
            posts: user.posts,
            token: generateToken(user._id),
          });
      } catch (error) {
        return done(error, false);
      }
    })
  );
