var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var Salts = mongoose.model("Salts");
var router = express.Router();
var passport = require('passport');






router.post('/register', function(req, res) {
  var newuser = new User(req.body);
  //Save user with passwordHash field blank
  newuser.dateJoined = new Date();
  newuser.save(function(err, newuser) {
    if (err) console.log(err);
    if (err) return res.status(500).send({
      err: "Issues with Rhythm's server :/"
    });
    if (!newuser) return res.status(400).send({
      err: 'You messed up!'
    });
    //Creates salt with id from new couple as reference
    var salt = new Salts({
      userId: newuser._id
    });
    //Sets salt string with SaltSchema method on Salts.js with crypto 64 bytes
    salt.setSalt();
    //Saves salt
    salt.save(function(err, salt) {
      if (err) return res.status(500).send({
        err: "Issues with Swinder's server :/"
      });
      if (!salt) return res.status(400).send({
        err: 'You messed up!'
      });
      //Update user with reference to salt with salt._id
      User.update({
        _id: salt.userId
      }, {
        saltRef: salt._id
      }, function(err, userWithSaltId) {
        if (err) return res.status(500).send({
          err: "Issues with Swinder's server :/"
        });
        if (!userWithSaltId) return res.status(400).send({
          err: 'You messed up!'
        });
        //Finds user to populate salt string to change reference id of salt to actual salt object
        User.findOne({
            _id: salt.userId
          })
          .populate({
            path: "saltRef",
            model: "Salts",
            select: "salt"
          })
          .exec(function(err, userWithSaltString) {
            if (err) return res.status(500).send({
              err: "Issues with Rhythm's server :/"
            });
            if (!userWithSaltString) return res.status(400).send({
              err: 'You messed up!'
            });
            //Hashes the password with salt with Couple setPassword method defined in User.js
            //Seconf param needs to be .salt.salt because salt is object with salt property that contains salt string from crypto
            userWithSaltString.setPassword(req.body.password, userWithSaltString.saltRef.salt);
            User.update({
              _id: userWithSaltString._id
            }, userWithSaltString, function(err, result) {
              if (err) return res.status(500).send({
                err: "Issues with Swinder's server :/"
              });
              if (!result) return res.status(400).send({
                err: 'You messed up!'
              });
              res.send();
            });
          });
      });
    });
  });
});



router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) { //-----NOT REACHING PASSPORT.JS 9.16 1:50am
    if (!user) return res.status(400).send(info);
    res.send({
      token: user.generateJWT()
    });
  })(req, res, next);
});






module.exports = router;
