const express = require('express');
const router = express.Router();
const passport = require ("passport");
const userController = require ("../controllers/user.controller");  



module.exports = (app) => {
  router.route("/auth/facebook")
.get(passport.authenticate("facebook"));

router.route("/auth/facebook/callback")
.get(passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/fail"
  })
);

router.route("/fail")
.get((req, res) => {
  res.send("Failed attempt");
}); 

router.route("/")
.get((req, res) => {
  res.send("Success");
}); };

