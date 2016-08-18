'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('user', {
		email: Sequelize.STRING,
		name:  Sequelize.STRING,
		managerCode: Sequelize.STRING
	});

	return User;
};