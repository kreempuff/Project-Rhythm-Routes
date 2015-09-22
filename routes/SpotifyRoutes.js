var request = require('request');
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model("User");

//LOGIN HANDLING----------------------------------------------------------------------------------------------------------------
router.get("/login", passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
    //res.send();

  });


router.get('/loginFinish',
  passport.authenticate('spotify', {
    failureRedirect: '/#/error'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/');
  });
//-------------------------------------------------------------------------------------------------------------
//MUSIC HANDLING-----------------------------------------------------------------------------------------------

module.exports = router;
