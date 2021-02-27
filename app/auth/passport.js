const passport = require("passport");

module.exports = function (app) {

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, done) {
      done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
      done(null, user);
  });
  
  const facebook = require('../strategy/facebook.strategy.js')();
  console.log(facebook);
};
