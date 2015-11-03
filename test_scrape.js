var request = require('request');
var cheerio = require('cheerio');



request('http://pitchfork.com/reviews/best/tracks/', function(req,res,data){
	var $ = cheerio.load(data);
	var newObj = {};
	$('span.artist').each(function(index, element){
		var value = element.next.next.children[0].data.trim();
		var key = element.children[0].data.trim()
		newObj[key] = value
	});
	console.log(cleanArtist(newObj));
});

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


// This turns the array method splice into a string method.
function stringClean(str, index, count) {
 var ar = str.split('');
 ar.splice(index, count);
 return ar.join('');
};

// Do I need to get rid of """ on songs?
// var cleanSong = function(obj){
// 		for (value in obj){
// 			var tempSong = {};
// 			for(var i = 0; i<value.length; i++){
// 				tempSong.trim();
// 			}
// 	// console.log(tempSong)
// 		}


// }

// console.log('test',cleanArtist(test));



