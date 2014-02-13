var _ = require('../underscore-min.js');

exports.view = function(req, res){
	var tag = req.query.tag;
	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");
	var tags = {};

	// Go through all articles to see which moods exist
	for (var i = 0; i < db_data.articles.length; i++) {
		var article = db_data.articles[i];
		for (var j = 0; j < article.moods.length; j++) {
			tags[article.moods[j]] = true;
		}
  }
	res.render('choosemood', {
		'tags': tags,
		'articles': db_data.articles,
		'selected_tag': tag
	});
};



exports.post = function(req, res){
	var db_data = require("../data.json");
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