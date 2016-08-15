var mysql = require('mysql');

var souce = {

	localhost: {
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'burger_db'
	},
	HelpingHands: {
		port: 3306,
		host: 'gx97kbnhgjzh3efb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
		user: 'tftt08hanwgwrd8v',
		password: 'o97cb1ri54juqybl',
		database: 'fztuoklvkjteqttj'
	}

}

var connection = mysql.createConnection( source.HelpingHands );

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('Databased connected as id: ' + connection.threadId);
});

module.exports = connection;