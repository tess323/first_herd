var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =(require('../models'));

router.use(bodyParser.urlencoded({extended: false}));

// router.get('/', function(req,res){
// 	res.render('signup')
// });;

router.route('/')
	.get(function(req,res){
		res.render('signup');
	})
	.post(function(req,res){
		if(req.body.password !== req.body.password2){
			req.flash('error','passwords must match!');
			res.redirect('signup');
		} else{
			db.user.findOrCreate({
				where: {
					email: req.body.email
				},
				defaults: {
					email: req.body.email,
					password: req.body.password,
					name: req.body.username,
				}
			}).spread(function(user,created){
				if(created){
					req.flash('success','You are signed up');
					res.redirect('signup');
				} else {
					req.flash('danger', 'A user with that email already exists');
					res.redirect('/');
				}
			}).catch(function(err){
				req.flash('error', 'an error occured');
				res.redirect('/');
			});

		}
	});



module.exports = router