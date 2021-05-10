const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: `${process.env.FRONTEND_HOST}/my-notes`,
  failureRedirect: `${process.env.FRONTEND_HOST}`
}));

module.exports= router;
