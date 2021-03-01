const express = require('express');
const passport = require("passport");


module.exports = (app) => {
    app.get("/auth/facebook", passport.authenticate("facebook"));

    app.get("/auth/facebook/callback", passport.authenticate("facebook", {
      successRedirect: "/profile",
      failureRedirect: "/fail"
    }));
  
    app.get("/fail", (req, res) => {
      res.send("Failed attempt");
    });
  
    app.get("/", (req, res) => {
      res.send("Success");
    });
}


