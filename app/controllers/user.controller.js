require('dotenv').config()
const db = require("../models/mongoose");
const passport = require("passport");
require('dotenv').config()
const Strategy = require('passport-facebook').Strategy;
const userModel = require("../models/user.model");


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      // const { email, first_name, last_name } = profile._json;
      // const userData = {
      //   email,
      //   firstName: first_name,
      //   lastName: last_name
      // };
      // new userModel(userData).save();
      // done(null, profile);
      console.log("Auth done");
      done(null, profile);
    }
  )
);