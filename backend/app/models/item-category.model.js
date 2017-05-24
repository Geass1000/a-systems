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
		required : true
	},
	name : {
		type : String,
		unique : true,
		required : true
	}
});

/**
 * getTextureCategories - извлечение категорий элементов из БД "ItemCategories"
 *
 * @function
 * @static
 *
 * @return {Array<Object>}
 */
itemCategorySchema.statics.getItemCategories = function () {
	return this.find().exec();
};

module.exports = connection.model('Item_Category', itemCategorySchema);
