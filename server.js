var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport'); //passport below mongoose
//Models
require('./models/User');
require('./models/Salts');
//passport configuration
require('./config/passport');


//connection
var dbUri = process.env.LOCAL_MONGO || process.env.MONGOLAB_URI || "mongodb://localhost/Rhythm_Routes";
mongoose.connect(dbUri, function (err, result) {
	if(err) console.log("Error Connecting to database: " + dbUri + ". Error: " + err);
	else console.log("Succesful connection to: " + dbUri);
});
//TESTING REQUEST-------------------------------------------------




//END OF NODE HTTP CLIENT-------------------------------------------
app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//For Spotify
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());





var userRoutes = require('./routes/UserRoutes');
var SpotifyRoutes = require('./routes/SpotifyRoutes');
var GoogleMapsRoutes = require('./routes/GoogleMapsRoutes');

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/spotify", SpotifyRoutes);
app.use("/api/v1/google-maps", GoogleMapsRoutes);


var server = app.listen(port, function() {
	var host = server.address().address;
	var time = new Date().toLocaleString();
	console.log('Example app listening at http://localhost:' + port);
	console.log("Time started: " + time);
});
