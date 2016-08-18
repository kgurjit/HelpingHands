var db = require('../models');
var Listing = require('../models')["listing"];
var Category = require('../models')["category"];
var User = require('../models')["user"];

// var Category = require('../models')["category"];

var ad = {
	getById: function(id, callback) {
		Listing.findOne({where: {id:id}, include: [User, Category]}).then(function(listing) {
			callback(listing);
		});
	},

	searchByCatg : function(catg, callback) {
		//fetch data from database and once retrieved call callback with that data
	},

	searchByKeywordsAndLoc : function(keywords, loc, callback){
		//search the db by keywords and loc and once retreved, call the callback with data
		var data = [];
		Listing.findAll().then(function(listings) {
			listings.forEach(function(listing) {
  				data.push(listing);
  			});
  			callback(data);
		});
	},

	getAllCategories: function(callback){
		Category.findAll().then(function(categories){
			callback(categories);
		}); 
	},

	create: function(listingData, callback, error){
		//check user email. If email exists, get the user id and attach to listing
		//else create user, get id and attach to listing
		User.findOrCreate({where: {email: listingData.email}}).spread(function(user, created){
			listingData.userId = user.id;
			Listing.create(listingData).then(function(createdListing){
				callback(createdListing.id);
			}).catch(function(){
				error();
			});
		}).catch(function(){
			error();
		});
		//get lat, lng for give address and attach to listing
		
	}
};


module.exports = ad;