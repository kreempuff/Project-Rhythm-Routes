var request = require('request');
var express = require('express');
var router = express.Router();




var base_auth_uri = function (clientId) {
  return uri = process.env.SPOTIFY_AUTH_BASE_URI + "authorize/?client_id=" + clientId +"&response_type=code&redirect_uri=http://localhost:3000";

}


/////SPOTIFY LOGIN ------------------------------------------------------------------------
router.get("/login", function (req, res) {
  console.log(base_auth_uri(process.env.SPOTIFY_CLIENT_ID));
  res.send();

})



module.exports = router;
