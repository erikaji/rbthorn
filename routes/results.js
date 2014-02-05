exports.viewResults = function(req, res) {
	var list = [];
	for (var key in req.query) {
		list.push(key);
	}
	var last = list.pop();
	res.render('results', {
	    'resultsName': list,
	    'last': last,
	    'query': req.query
	});
}