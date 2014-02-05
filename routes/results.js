exports.viewResults = function(req, res) {
	console.log("The result is: " + req.query);
	var list = [];
	for (var key in req.query) {
		list.push(key);
		console.log("The results name is: " + key);
	}
	var last = list.pop();
	res.render('results', {
	    'resultsName': list,
	    'last': last
	});
}