var express = require('express');
var router = express.Router();
var request = require('request');
var express = require('express');
var app = express();
var db =(require('../models'));

router.get('/',function(req,res){
	db.favorite.findAll({where:{userId:req.session.user}}).then(function(favorite){
		// res.send(favorites);
	res.render('playlist',{favorites: favorite})
	});
});






module.exports = router;