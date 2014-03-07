var _ = require('../underscore-min.js');

exports.view = function(req, res){
	//viewFunction(req, res, false);
	// Using updated based on experiment results
	viewFunction(req, res, true);
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

	var tag = req.query.tag;
	var mood_colors = db_data.mood_colors;
	var mood_rank = [];

	// Go through all articles and count up the moods
	for (var i = 0; i < db_data.articles.length; i++) {
		var article = db_data.articles[i];
		for (var j = 0; j < article.moods.length; j++) {
			if (article.moods[j] in mood_rank) {
				mood_rank[article.moods[j]]++;
			} else {
				mood_rank[article.moods[j]] = 0;
			}
			mood_rank[article.moods[j]]++;
		}
  }

  /* 
  Algorithm we'll use for mood order is:
  Tier 1: For > 3 articles, sorted by # of articles, highest first
  Tier 2: For <= 3 articles, alphaetical order
	*/
	var tier_one_moods = [];
	var tier_two_moods = [];

	// First, we need to populate into an array form like: 
	// [ {mood: <mood>, rank: <rank>, color: <color>}, ..]
	for (var mood in mood_rank) {
		if (mood_rank[mood] <= 3) {
			tier_two_moods.push({
				'mood': mood,
				'rank': mood_rank[mood],
				'color': mood_colors[mood]
			});
		} else {
			tier_one_moods.push({
				'mood': mood,
				'rank': mood_rank[mood],
				'color': mood_colors[mood]
			});
		}
	}

	// Sort Tier 1 by rank first, then by alphetical mood
	tier_one_moods = tier_one_moods.sort(function (a, b) {
	    return (a.rank == b.rank ? a.mood.localeCompare( b.mood ) : b.rank - a.rank);
	});

	// Simply sort Tier 2 by alphetical mood
	tier_two_moods = tier_two_moods.sort(function (a, b) {
	    return a.mood.localeCompare( b.mood );
	});

	res.render('choosemood', {
		'tags': tier_one_moods.concat(tier_two_moods),
		'articles': db_data.articles,
		'selected_tag': tag,
		'experiment': isExperiment
	});
};

function postFunction(req, res, isExperiment) {
	var db_data;	// Choose db_data based on experiment or not
	if (isExperiment) {
		db_data = require("../data.json");
	} else {
		db_data = require("../dataOLD.json");		
	}

	var tagList = req.body.tags;
	var resData = {
		articleNumber: 0,
		moods: tagList.slice(),
	};
	db_data.articles.forEach(function(entry){
		if (tagList.length === _.intersection(tagList, entry.moods).length){
			resData.articleNumber++;
			resData.moods = _.uniq(resData.moods.concat(entry.moods));
		}
	});
 
	res.send(resData);
};

exports.post = function(req, res){
	postFunction(req, res, false);
};
exports.postExperiment = function(req, res){
	postFunction(req, res, true);
};
