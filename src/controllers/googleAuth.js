import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../models/user';
dotenv.config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALL_BACKURL,
      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      console.log(profile, 'this is the profile');
      const user = await User.findOne({ email: profile.emails[0].value });
      console.log(user, 'this is the user here')
      if (user) {
        const userId = user.id;
        return done(null, { 
          email:user.email,
          names:user.names,
          firstSignIn:false
         });
      }
      const newUser = await User.create({
        email: profile.emails[0].value,
        names: profile.displayName,
        password: null,
      });
   
      return done(null, {
        email: profile.emails[0].value,
        names: profile.displayName,
        firstSignIn:true
      });
    }
  )
);

export default passport;
