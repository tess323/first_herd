var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =(require('../models'));
var session = require('express-session');

// router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res) {
		res.render('favorites', {favorites: false});
});


router.get('/:id', function(req, res) {
	var q = req.params.id;
  	db.favorite.findById(q).then(function(favorite) {
  		// res.send(favorite)
    	res.render('favorites', {favorites: favorite});
 	});
});



module.exports = router