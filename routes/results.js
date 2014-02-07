exports.viewResults = function(req, res) {
	var tags = req.query.tags;
	var last = tags.pop();

	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");
	
	res.render('results', {
	    'resultsName': tags,
	    'last': last,
	    'query': req.query,
	    'articles': db_data['articles'],
	});
}