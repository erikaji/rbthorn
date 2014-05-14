exports.view = function(req, res){
	var pool = req.app.get('pool');
	pool.getConnection(function(err, connection) {
	    connection.query('SELECT * FROM (rbt, user) WHERE (rbt.user_id = user.user_id AND rbt.user_id = 2)', function(err, rows_rbt) {
	    	res.render('edit', {
				rbt: rows_rbt
			});
	        connection.release();
	    });
	});
};