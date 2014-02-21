var _ = require('../underscore-min.js');

exports.viewResults = function(req, res) {
	var tags = req.query.tags;

	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");
	var articles = [];

	// Go through all articles to set which articles to show
	for (var i = 0; i < db_data.articles.length; i++) {
		var article = db_data.articles[i];
		var shouldShow = true;
		for (var j = 0; j < req.query.tags.length; j++) {
			if (!_.contains(article.moods, req.query.tags[j])) {
				shouldShow = false;
				break;
			}
		}

		if (shouldShow) {
			articles.push(article);
		}
  }

	res.render('results', {
	    'resultsName': tags,
	    'query': req.query,
	    'articles': articles,
	    'mood_colors': db_data.mood_colors,
	    'referer': req.headers.referer
	});
}