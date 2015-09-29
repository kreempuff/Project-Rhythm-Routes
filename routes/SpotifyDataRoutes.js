var request = require('request');
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var spotifyBaseAPIRoute = "https://api.spotify.com"
var searchParams = function(query, type, limit, offSet) {
  var q = query,
    type = type || "",
    limit = limit || "",
    offSet = offSet || "";
  return "/search?q=abba&type=track"
}

//MUSIC HANDLING-----------------------------------------------------------------------------------------------






router.post("/get-songs", function(req, res) {
  var response = req.body.songs;
  request.get(spotifyBaseAPIRoute + "/v1/search?q=" + response + "&type=track", function(err, queryObj) {
    if (err) return res.status(500).send({
      err: "There was an error processing your request"
    });
    if (!res) return res.status(500).send({
      err: "There was an error processing your request"
    });
    response = queryObj.body;
  res.send(response);

  });
})
router.post("/play-song-preview", function(req, res) {
  request.get(spotifyBaseAPIRoute + "/v1/tracks/" + req.body.songId, function(err, res) {
    if (err) return res.status(500).send({
      err: "There was an error processing your request"
    });
    if (!res) return res.status(500).send({
      err: "There was an error processing your request"
    });
    console.log(res);
    res.send(res);
  })
})









module.exports = router;
