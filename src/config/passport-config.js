import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { GoogleAuthVerify } from "../services/auth.services.js";

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: `${process.env.CLIENT_SIDE_URL}/auth/google/callback`,
    },
    GoogleAuthVerify
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
