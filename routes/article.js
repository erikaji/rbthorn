
/*
 * GET article page.
 */

exports.view = function(req, res){
	var id = req.params.id;

	// TODO: Grab article using id
	// Using placeholder article for now
	var title = 'Smashing Hit';
	var headline = 'Super Bowl draws 111.5M viewers';
	var contents = [
		'NEW YORK -- For the fourth time in five years, the Super Bowl has set a record for the most-watched television event in U.S. history, drawing 111.5 million viewers even though the Seattle Seahawks\' 43-8 victory over the Denver Broncos wasn\'t really competitive.',
		'The ratings record is further evidence of how live events are becoming dependable and valuable properties for broadcast television at a time the audience is fragmenting and ratings for regular entertainment shows continue to fall.',
		'"Big-event television is a great way for people to have a communal event, to talk about it socially and to talk about it as a group," said Bill Wanger, executive vice president for programming and research at Fox Sports. "You see that in the Super Bowl numbers of the past four or five years. They\'ve just gone up to a different level."',
	];

	res.render('article', {
    'id': id,
    'title': title,
    'headline': headline,
    'contents': contents,	
	});
};