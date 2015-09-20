var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var router = express.Router();




router.post("/login", function(req, res) {

  res.send();
});


router.post("/register", function(req, res) {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function(err, result) {
    if(err) res.status(500).send({err: "There was an error saving the user"});
    if(!result) res.status(500).send({err: "There was an error saving the user" });
    res.send(result);
  });
})


module.exports = router;
