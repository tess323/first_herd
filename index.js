var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var db =(require('./models'));


app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: false}));
var session = require('express-session');

app.use(session({
	secret:"shhhhhhhh",
	resave: false,
	saveUninitialized: true
}));


app.use(function(req,res,next){
	req.session.user = 4;
	if(req.session.user){
		db.user.findById(req.session.user).then(function(user){
			if(user) {
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
			req.currentUser = false;
			next();

		}		
});

var flash = require('connect-flash');
app.use(flash());

app.use(function(req, res, next){
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next()
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/login', function(req,res){
	res.render('login');
});

app.get('/db_test', function(req,res){
	res.render('db_test');
});

// app.get('/playlist', function(req, res) {
// 	res.render('playlist');
// });


// app.get('/favorites', function(req, res) {
// 	res.render('favorites');
// });



app.use('/scraping', require('./controllers/scraping'));
app.use('/signup', require('./controllers/signup'));
app.use('/applogin', require('./controllers/login'));
app.use('/favorites', require('./controllers/favorites'));
app.use('/playlist', require('./controllers/playlist'));






app.listen(process.env.PORT || 3000)
