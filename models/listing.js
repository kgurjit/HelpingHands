'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Listing = sequelize.define('listing', {
		title: Sequelize.STRING,
		image: Sequelize.STRING,
		details: Sequelize.STRING,
		address: Sequelize.STRING,
		city: Sequelize.STRING,
		state: Sequelize.STRING,
		zipCode: Sequelize.STRING,
		latitude: Sequelize.DECIMAL(9,6),
		longitude: Sequelize.DECIMAL(9,6),
		isActive: Sequelize.BOOLEAN
	});

	return Listing;
};