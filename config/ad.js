var db = require('../models');
var Listing = require('../models')["listing"];
var Category = require('../models')["category"];

var ad = {
	latestTen : function(callback){
		//fetch data from database and once retrieved call callback with that data
	},

	allAds : function(callback) {
		//fetch data from database and once retrieved call callback with that data
	},

	searchByCatg : function(catg, callback) {
		//fetch data from database and once retrieved call callback with that data
	},

	searchByKeywordsAndLoc : function(keywords, loc, callback){
		//search the db by keywords and loc and once retreved, call the callback with data
		var data = [];
		Listing.findAll().then(function(listings) {
			listings.forEach(function(listing) {
  				console.log('Data: ' + JSON.stringify(listing));
  				data.push(listing);
  			});
  			callback(data);
		});
	},

	create: function(listingData, callback, error){
		//save the above in the database..
		Listing.create(listingData).then(function(){
			callback();
		}).catch(function(){
			error();
		});
	}
};


module.exports = ad;