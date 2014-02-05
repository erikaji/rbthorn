exports.viewResults = function(req, res) {
	var tags = req.query.tags;
	var last = tags.pop();
	res.render('results', {
	    'resultsName': tags,
	    'last': last,
	    'query': req.query
	});
}