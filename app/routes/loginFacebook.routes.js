const passport = require('passport');
const express = require('express');
var router = express.Router();

const facebook = require("../services/facebookStrategy");

router.get('/auth/facebook',
  passport.authenticate('facebook'));

module.exports = router;