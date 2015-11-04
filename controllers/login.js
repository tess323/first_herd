var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =(require('../models'));
var session = require('express-session');

router.use(bodyParser.urlencoded({extended: false}));

// router.get('/', function(req,res){
// 	res.render('signup')
// });;

router.route('/')
	.get(function(req,res){
		res.render('applogin');
	})
	.post(function(req,res){
		db.user.authenticate(
			req.body.email, 
			req.body.password,
			function(err, user) {
				if (err) {
					res.send(err);
				} else if (user) {
					req.session.user = user.id;
					req.flash('success', 'you are logged in');
					res.redirect('/');
				} else {
					req.flash('danger', 'Invalid username or password');
					res.redirect('applogin');
				}
			}	
		);
	});



router.get('/logout', function(req,res){
	req.flash('info', 'You have been logged out');
	req.session.user = false;
	res.redirect('/')
});

module.exports = router