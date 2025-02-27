import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Mettre à jour la photo si nécessaire
          if (profile.photos && profile.photos[0]) {
            user.picture = profile.photos[0].value;
            await user.save();
          }
          return done(null, user);
        }

        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: "google-auth",
          googleId: profile.id,
          picture: profile.photos ? profile.photos[0].value : null,
          role: "patient",
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
