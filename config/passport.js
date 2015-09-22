var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var SpotifyStrategy = require('passport-spotify').Strategy;
var User = mongoose.model('User');
var Salts = mongoose.model('Salts');

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
      username: username
    }) //find the username in the model from where it's being called.
    .populate({
      path: "saltRef",
      model: 'Salts',
      select: 'salt'
    })
    .exec(function(err, user) {
      if (err) return done({
        err: "Server has issues."
      });
      if (!user) return done({
        err: "User does not exist"
      });
      if (!user.checkPassword(password, user.saltRef.salt)) return done({
        err: "Invalid username and password combination."
      });
      return done(null, user);
    });
}));


var redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/api/v1/spotify/loginFinish';
// var redirect_uri = 'http://https://rhythm-routes.herokuapp.com/api/v1/spotify/loginFinish';
SPOTclientID = process.env.SPOTIFY_CLIENT_ID || "9b4852017f934a90a512fcd820c12748"
SPOTclientSecret = process.env.SPOTIFY_CLIENT_SECRET || "43576c30460c499a8e2fa007809fbae7"
passport.use(new SpotifyStrategy({
    clientID: SPOTclientID,
    clientSecret: SPOTclientSecret,
    callbackURL: redirect_uri
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      spotifyId: profile.id
    }, {
      username: profile.displayName,
      spotifyId: profile.id,
      email: profile.emails[0].value
    }, function(err, user) {

      return done(err, user);

    });
  }
));
