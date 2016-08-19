var db = require('../models');
var bcrypt = require('bcrypt-nodejs');
var Listing = require('../models')["listing"];
var Category = require('../models')["category"];
var User = require('../models')["user"];

// var Category = require('../models')["category"];

var ad = {
	getById: function(id, callback) {
		Listing.findOne({
			where: {
				id: id
			},
			include: [User, Category]
		}).then(function(listing) {
			callback(listing);
		});
	},

	searchByCatg: function(catg, callback) {
		//fetch data from database and once retrieved call callback with that data
	},

	searchByKeywordsAndLoc: function(keywords, loc, callback) {
		//search the db by keywords and loc and once retreved, call the callback with data
		var data = [];
		Listing.findAll().then(function(listings) {
			listings.forEach(function(listing) {
				data.push(listing);
			});
			callback(data);
		});
	},

	getAllCategories: function(callback) {
		Category.findAll().then(function(categories) {
			callback(categories);
		});
	},

	createListing: function(listingData, callback, error) {
		Listing.create(listingData).then(function(createdListing) {
			callback(createdListing.id);
		}).catch(function() {
			error();
		});
		//get lat, lng for give address and attach to listing
	},

	createUser: function(user, callback, error) {
		User.findOne({
			where: {
				username: user.username
			}
		}).then(function(model) {
			if (model) {
				error('User name already exists. Please login using sign in link.');
			} else {
				// password validation can be performed here
				var password = user.password;
				var hash = bcrypt.hashSync(password);

				db.user.create({
					username: user.username,
					password: hash
				}).then(function(model) {
					callback();
				}).catch(function() {
					error('Error creating user');
				});
			}
		});
	}
};


module.exports = ad;