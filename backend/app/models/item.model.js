'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

/**
 * _cid - ID категории;
 * type - Surface или Object
 * preview - url адрес изображения превью;
 * payload - данные о элементе, зависит от типа;
 *
 */
let itemSchema = new Schema({
	_cid : {
		type : String,
		require : true
	},
	type : {
		type : String,
		require : true
	},
	preview : {
		type : String,
		require : true
	},
	payload : {
		type : Schema.Types.Mixed,
		require : true
	}
});

/**
 * payload : { surface, object }
 * surface :  { points, tStroke, tFill }
 * object : { url, size }
 *
 */

/**
 * Получить все элементы из БД "Items"
 *
 * @param  {none}
 */
itemSchema.statics.getAllItems = function () {
	return this.find().exec();
};

module.exports = connection.model('Item', itemSchema);
