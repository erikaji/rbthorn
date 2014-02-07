
/*
 * GET article page.
 */

exports.view = function(req, res){
	var id = req.params.id;

	// TODO: Grab article using id
	// Using placeholder article for now
	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");

	var article;
	for(var i=0; i < db_data.articles.length; i++) {
		console.log('checking for ' + db_data.articles[i].id);
    if (db_data.articles[i].id == id) {
    	article = db_data.articles[i];
    }
  }

	res.render('article', {
		'article': article,
	});
};