
/*
 * GET article page.
 */

exports.view = function(req, res){
	var id = req.params.id;
	var tags = req.query.tags;
  var query='';
  for (var i in tags)
    query=query+'tags[]='+tags[i]+'&';
  query = query.slice(0,-1);


	// Simulating db here - will replace with proper db later
	var db_data = require("../dataOLD.json");

	var article;
	for(var i=0; i < db_data.articles.length; i++) {
    if (db_data.articles[i].id == id) {
    	article = db_data.articles[i];
    }
  }

	res.render('article', {
		'article': article,
		'referer': req.headers.referer,
		'query': query
	});
};
