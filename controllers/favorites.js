var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db =(require('../models'));
var session = require('express-session');

// router.use(bodyParser.urlencoded({extended: false}));

// router.get('/', function(req, res) {
// 	res.render('favorites');
// });


router.get('/', function(req, res) {
  db.favorite.findAll({
    order: 'song ASC'
  }).then(function(favorites) {
    res.render('favorites', {favorites: favorites});
  });
});



module.exports = router