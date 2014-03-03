var _ = require('../underscore-min.js');

exports.view = function(req, res){
	viewFunction(req, res, false);
};

exports.viewExperiment = function(req, res){
	viewFunction(req, res, true);
};

function viewFunction(req, res, isExperiment) {
	var db_data;	// Choose db_data based on experiment or not
	if (isExperiment) {
		db_data = require("../data.json");
	} else {
		db_data = require("../dataOLD.json");		
	}

	var tags = req.query.tags;
  var query='';
  for (var i in tags)
    query=query+'tags[]='+tags[i]+'&';
  query = query.slice(0,-1);

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
	    'referer': req.headers.referer,
	    'query': query,
	    'experiment': isExperiment
	});
};
