var orm = require("../config/orm.js");

var ad = {
	latestTen : function(callback){
		//fetch data from database and once retrieved call callback with that data
	},

	allAds : function(callback) {
		//fetch data from database and once retrieved call callback with that data
		orm.allAds('tblListing', function (res) {
			cb(res);
		});
	},

	searchByCatg : function(catg, callback) {
		//fetch data from database and once retrieved call callback with that data
	},

	searchByKeywordsAndLoc : function(keywords, loc, callback){
		//search the db by keywords and loc and once retreved, call the callback with data
		var sofa1 = {
			name: 'Green Sofa',
			desc: 'Awesome sofa... very lightly used..',
			pic: 'http://cdn.shopify.com/s/files/1/0946/5580/products/corner-convertable-sofa-1.jpeg',
			loc: '1 Grand Ave, NYC',
			coords: {lat: 40.767006, lng: -73.969795}
		};

		var sofa2 = {
			name: 'White Sofa',
			desc: 'Awesome sofa... very lightly used..',
			pic: 'http://st.hzcdn.com/simgs/151103ef058304f3_4-5109/traditional-sofas.jpg',
			loc: '2 Grand Ave, NYC',
			coords: {lat: 40.765836, lng: -73.970911}
		};

		var data = [sofa1, sofa2];
		callback(data);
		 
	},

	create: function(title, desc, loc, pic, user, callback){
		//save the above in the database..
		orm.create('tblListing', desc, loc, pic, user, function (res) {
			callback(res);
		});
	}
};


module.exports = ad;