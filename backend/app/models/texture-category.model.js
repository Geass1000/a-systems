'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

/**
 * name - название типа текстур;
 *
 */
let textureCategorySchema = new Schema({
	name : {
		type : String,
		unique : true,
		required : true
	}
});

/**
 * getTextureCategories - извлечение категорий текстур из БД "TextureCategories"
 *
 * @function
 * @static
 *
 * @return {Array<Object>}
 */
textureCategorySchema.statics.getTextureCategories = function () {
	return this.find().exec();
};

module.exports = connection.model('Texture_Category', textureCategorySchema);
