var request = require('request');
var express = require('express');
var router = express.Router();




var base_auth_uri = function () {
  return uri = process.env.SPOTIFY_AUTH_BASE_URI + "authorize/?client_id=" + process.env.SPOTIFY_CLIENT_ID +"&response_type=code&redirect_uri=" + process.env.REDIRECT_URI;

}


/////SPOTIFY LOGIN ------------------------------------------------------------------------
router.get("/login", function (req, res) {

  res.send({web_auth_uri: base_auth_uri()});

})



module.exports = router;
