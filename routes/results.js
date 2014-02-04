exports.viewResults = function(req, res) {
 	var name = req.params.name;
	console.log("The results name is: " + name);
	res.render('results', {
    'resultsName': name
  });
}