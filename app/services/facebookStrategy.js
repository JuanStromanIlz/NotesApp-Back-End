const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: process.env.APP_URL,
    enableProof: true,
    profileFields: [
        'id', 
        'displayName', 
        'photos', 
        'email']
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
    console.log(profile);
}
));