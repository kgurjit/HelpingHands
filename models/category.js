'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Category = sequelize.define('category', {
		name: Sequelize.STRING
	});

	return Category;
};