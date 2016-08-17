'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Listing = sequelize.define('listing', {
		title: Sequelize.STRING,
		details: Sequelize.STRING,
		image: Sequelize.STRING,
		address1: Sequelize.STRING,
		address2: Sequelize.STRING,
		city: Sequelize.STRING,
		state: Sequelize.STRING,
		zipCode: Sequelize.STRING,
		latitude: Sequelize.DOUBLE(9,6), 
		longitude: Sequelize.DOUBLE(9,6), 
		isActive: Sequelize.BOOLEAN 
	});

	return Listing;
};