'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let itemCategorySchema = new Schema({
	_pid : {
		type : String
	},
	name : {
		type : String,
		unique : true,
		require : true
	}
});

/**
 * Получить все типы текстур из БД "TextureTypes"
 *
 * @param  {Object} user user info
 */
itemCategorySchema.statics.getAllItemCategories = function () {
	return this.find().exec();
};

module.exports = connection.model('Item_Category', itemCategorySchema);
