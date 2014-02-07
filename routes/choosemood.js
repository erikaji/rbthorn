exports.view = function(req, res){
	var tag = req.query.tag;
	// Simulating db here - will replace with proper db later
	var db_data = require("../data.json");

	res.render('choosemood', {
		'tags': db_data.tags,
		'selected_tag': tag
	});
};