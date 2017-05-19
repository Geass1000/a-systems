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
 * Получить все текстуры из БД "textures"
 *
 * @param  {Object} user user info
 */
textureSchema.statics.getAllTextures = function (category) {
	let sel = '_id _cid url width height';
	return category ? this.find({ _cid : { $in : category } }).select(sel).exec() :
										this.find().select(sel).exec();
};

module.exports = connection.model('Texture', textureSchema);
