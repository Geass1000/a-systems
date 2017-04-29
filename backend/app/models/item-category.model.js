'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

/**
 * _pid - ID родительской категории (если нет, то равен null);
 * name - название категории;
 *
 */
let itemCategorySchema = new Schema({
	_pid : {
		type : String,
		require : true
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
