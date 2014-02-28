
/*
 * GET external page.
 */

exports.view = function(req, res){
	var id = req.params.id;

	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");

	var article;
	for(var i=0; i < db_data.articles.length; i++) {
    if (db_data.articles[i].id == id) {
    	article = db_data.articles[i];
    }
  }

	res.render('external', {
		'article': article,
		'referer': req.headers.referer
	});
};