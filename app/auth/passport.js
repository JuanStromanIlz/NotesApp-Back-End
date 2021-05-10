const session = require('express-session');
const passport = require('passport');
const db = require('../models/mongoose');
const User = db.users;

module.exports = function (app) {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function (user, done) {
    //this id correspond to User.facebookId
      done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.find({facebookId: id}, function(err, user) {
      done(err, user);
    });
  });

  const facebook = require('../strategy/facebook.strategy.js')();
};
