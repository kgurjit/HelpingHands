'use strict';

module.exports = function(sequelize, DataTypes) {
	var Create = sequelize.define("Create", {
		userName: DataTypes.STRING,
		listingId: DataTypes.INTEGER,
		category: DataTypes.STRING,
		imageName: DataTypes.STRING,
		listingDetails: DataTypes.STRING,
		address1: DataTypes.STRING,
		address2: DataTypes.STRING,
		city: DataTypes.STRING,
		state: DataTypes.STRING,
		zipCode: DataTypes.INTEGER,
		latitude: DataTypes.INTEGER,
		longitude: DataTypes.INTEGER,
		isactive: DataTypes.BOOLEAN
	})
}