exports.view = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
	    connection.query('SELECT * FROM (rbt, user) WHERE (rbt.user_id = user.user_id AND rbt.user_id = 2)', function(err, rows_rbt) {
	    	res.render('profile', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};

exports.post = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
		connection.query('UPDATE rbt SET rbt_rose="'+req.body.rose+'" WHERE rbt_id=3', function(err, rows) {
			connection.query('UPDATE rbt SET rbt_bud="'+req.body.bud+'" WHERE rbt_id=3', function(err, rows) {
				connection.query('UPDATE rbt SET rbt_thorn="'+req.body.thorn+'" WHERE rbt_id=3', function(err, rows) {
					connection.query('UPDATE rbt SET rbt_photo="'+req.body.photo+'" WHERE rbt_id=3', function(err, rows) {
			 			connection.query('SELECT * FROM (rbt, user) WHERE (rbt.user_id = user.user_id AND rbt.user_id = 2)', function(err, rows_rbt){
						    res.render('profile', {
						    	rbt: rows_rbt
				    		});
						});
	 				});
				});
			});
		});
	});
}