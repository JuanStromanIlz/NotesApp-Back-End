const express = require('express');
const app = express();
const passport = require("passport");
const isLoggedIn = require("../auth/session.auth");



module.exports = (app) => {
  
    app.get("/profile", isLoggedIn, (req, res) => {
        res.render("profile", {user: req.user[0]});
    });

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.get("/logout", (req, res)=>{
        req.logout();
        req.session.destroy((err) => {
          res.clearCookie('connect.sid');
          res.redirect("/login");
        });
      
      });
}