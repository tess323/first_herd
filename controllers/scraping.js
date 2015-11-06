var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
// var $ = cheerio.load;
var express = require('express');
var app = express();
var db =(require('../models'));

// pull the artist and tracks from pitchfork

router.get('/', function(req,res){
		request('http://pitchfork.com/reviews/best/tracks/', function(error,response,data){
		if(!error && response.statusCode == 200){
		var $ = cheerio.load(data);
		var newObj = {};
			// This turns the array method splice into a string method.
		function stringClean(str, index, count) {
		 var ar = str.split('');
		 ar.splice(index, count);
		 return ar.join('');
		};
			// This cleans data of whitespace and colons.
		var cleanArtist = function(obj){
	   		var tempObj = {};
	   		for (key in obj) {
	       		for (var i = 0; i < key.length; i++) {
	           		if (key[i] === ':'){
	               	tempObj[stringClean(key, i, 1).trim()] = obj[key];
	           		};  
	       		};
	    
	   		}
	   		return (tempObj);
		};

		$('span.artist').each(function(index, element){
			var value = element.next.next.children[0].data.trim();
			var key = element.children[0].data.trim()
			var newValue = value.replace(/"/g,"");
			var newKey = key.replace(/"/g,"");
			newObj[newKey] = newValue
		});
		console.log(cleanArtist(newObj));
		// res.send(cleanArtist(newObj))
		res.render('scraping', {data:(cleanArtist(newObj))});
	}
	});


});

router.post('/', function(req,res){
	db.user.findById(req.currentUser.id).then(function(user){
		user.createFavorite({
			artist:req.body.artist,
			song:req.body.song
		}).then(function(favorite){
			res.redirect('favorites/'+favorite.id);
		});
	});


	// db.user.findById(req.currentUser.id).then(function(user){

	// db.favorite.findOrCreate({
	// 		where:{
	// 			artist:
	// 		},
	// 		defaults: {
	//       		song: 
	//       		userId:
	//     }
	//   }).spread(function(favorite, created) {
	//     console.log(favorite.get());
	//     res.redirect('/');
	//   });
	});





module.exports = router;