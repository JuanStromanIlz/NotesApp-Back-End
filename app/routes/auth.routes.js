const express = require('express');
const passport = require("passport");


module.exports = app => {
    app.get("/facebook", passport.authenticate("facebook"));

    app.get("/facebook/callback", passport.authenticate("facebook", {
      successRedirect: `${process.env.FRONTEND_HOST}/my-notes`,
      failureRedirect: `${process.env.FRONTEND_HOST}`
    }));
  
    // app.get("/fail", (req, res) => {
    //   res.send("Failed attempt");
    // });
  
    // app.get("/", (req, res) => {
    //   res.send("Success");
    // });
}


