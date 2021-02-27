require('dotenv').config()
const passport = require("passport");
const facebookStrategy = require('passport-facebook').Strategy;

module.exports = () => {
    passport.use(
        new facebookStrategy(
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
      )
}
