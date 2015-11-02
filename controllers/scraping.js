var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var $ = cheerio.load;
var express = require('express');
var app = express();

// pull the artist and tracks from pitchfork

router.get('/scraping', function(req,res){
	request('http://pitchfork.com/best/', function(err, resp,html){
		if(!err && resp.statusCode === 200){
			var parsedHTML = $.load(html)
			var textArray = []
			parsedHTML('.info').map(function(i, scrape){
				var text = $(info).text()
				if(!(text)) return
				textArray.push(text)
			})
			res.send(textArray);
		}
	})
});






module.exports = router;