var db = require('../models');
var bcrypt = require('bcrypt-nodejs');
var Listing = require('../models')["listing"];
var Category = require('../models')["category"];
var User = require('../models')["user"];

var geocoder = require('geocoder');


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

	getListingsForUser: function(userId, callback, error) {
		Listing.findAll({
			where: {
				userId: {$eq: userId}
			}
		}).then(function(listings){
			if(!listings || listings.length === 0) {
				listings = [];
			}
			callback(listings);
		}).catch(function(){
			error();
		})
	},

	deleteListing: function(listingId, callback, error){
		Listing.destroy({where: {id: {$eq: listingId}}}).then(function(){
			callback();
		}).catch(function(){
			error();
		});
	},

	
searchByKeywordsAndLoc: function(catgId, loc, callback, error) {

        var condition = {};

        if(catgId !== '') {
            condition['where'] = {categoryId: catgId};
        }
      
      if(loc && loc.trim().length === 5) {

          if(catgId == '') {
              condition['where'] = {zipCode: {$eq: loc}};
          } else    {
          condition.where['$and'] = {zipCode: {$eq: loc}};
          }
          
      }    

      Listing.findAll(condition).then(function(listings) {
      if(!listings || listings.length === 0) {
          listings = [];
      } 
      callback(listings);
      }).catch(function(){
      if(error) {
          error();
      }
      });
 },

	getAllCategories: function(callback) {
		Category.findAll().then(function(categories) {
			callback(categories);
		});
	},

	createListing: function(listingData, callback, error) {
		var completeAddress = listingData.address + "," + listingData.city + "," + listingData.state + " " + listingData.zipCode;
		console.log('\n\nComplete Address: ' + completeAddress);

		geocoder.geocode(completeAddress, function(err, data) {
			listingData["latitude"] = data.results[0].geometry.location.lat;
			listingData["longitude"] = data.results[0].geometry.location.lng;
			console.log('\n\nLat: ' + listingData["latitude"]);
			console.log('\n\nLng: ' + listingData["longitude"]);

			Listing.create(listingData).then(function(createdListing) {
				callback(createdListing.id);
			}).catch(function() {
				error();
			});
		});
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