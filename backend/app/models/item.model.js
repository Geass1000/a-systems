'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

/**
 * _cid - ID категории;
 * type - Surface или Object
 * preview - изображение-превью элемента
 * payload - данные о элементе, зависит от типа;
 *
 * payload : { surface, object }
 * surface :  { points, stroke, fill }
 * object : { url, size }
 */
let itemSchema = new Schema({
	_cid : {
		type : String,
		required : true
	},
	type : {
		type : String,
		required : true
	},
	preview : {
		type : String,
		required : true
	},
	payload : {
		type : Schema.Types.Mixed,
		required : true
	}
});

/**
 * Получить все элементы из БД "Items"
 *
 * @param  {none}
 */
itemSchema.statics.getAllItems = function () {
	return this.find().exec();
};

module.exports = connection.model('Item', itemSchema);
