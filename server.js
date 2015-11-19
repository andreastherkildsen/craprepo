// Base Setup for the server - NODE.JS plugins
var express      = require('express');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var path         = require('path');
var passport     = require('passport');
var authenticate = require('./routes/authenticate')(passport);
var logger       = require('morgan');
var mongoose     = require('mongoose');
var mongodb      = require('mongodb');
var app          = express();
var port         = 1337;


//Connect til mongooseDB
mongoose.connect('mongodb://localhost/');

//MODELS

var router = express.Router();
var User = require('./models/users');
var Post = require('./models/post');

//ROUTES 

require('./routes/users.js')(router, mongoose, User);
require('./routes/post.js')(router, mongoose, Post);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.header("Acess-Control-Allow-Origin", "*");
	res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, ID");
	res.header("Acess-Control-Allow-Methods", "DELETE, PUT");
	next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);




app.get('/', function(req, res){
	res.sendFile('../index.html');
});


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});


//Test om der er forbindelse til API

router.get('/', function(req, res) {
	res.json({ message: 'Apiet virker, der er hul igennem du'});

	});


app.use('/api', router);
app.use('/auth', authenticate);

//Besked til console når der oprettes/slettes i DB
router.use(function(res, req, next) {
	console.log('Der sker noget her!')
	next();
});


//Consol besked ved start af server
app.listen(port);
console.log('We are live on port' + port);