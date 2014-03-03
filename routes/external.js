
/*
 * GET external page.
 */

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

	var id = req.params.id;
	var tags = req.query.tags;
  var query='';
  for (var i in tags)
    query=query+'tags[]='+tags[i]+'&';
  query = query.slice(0,-1);


	var article;
	for(var i=0; i < db_data.articles.length; i++) {
    if (db_data.articles[i].id == id) {
    	article = db_data.articles[i];
    }
  }

	res.render('external', {
		'article': article,
		'referer': req.headers.referer,
		'query': query,
		'experiment': isExperiment
	});
};
