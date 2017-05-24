'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

/**
 * _cid - ID категории;
 * type - Surface или Furniture
 * preview - url адрес изображения превью;
 * payload - данные о элементе, зависит от типа;
 *
 */
let textureSchema = new Schema({
	_cid : {
		type : String,
		required : true
	},
	url : {
		type : String,
		required : true
	},
	width : {
		type : Number,
		required : true,
	},
	height : {
		type : Number,
		required : true,
	}
});


/**
 * getTextures - извлечение текстур из БД "Textures"
 *
 * @function
 * @static
 *
 * @param {Array<string>} category - массив с категориями
 * @return {Array<Object>}
 */
textureSchema.statics.getTextures = function (category) {
	return category ? this.find({ _cid : { $in : category } }).exec() : this.find().exec();
};

module.exports = connection.model('Texture', textureSchema);
