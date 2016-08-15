var connection = require('../config/connection.js');

var orm = {
	allAds: function (tableName, cb) {
		var queryString = 'SELECT * FROM ' + tableName + ';';
		connection.query(queryString, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
};