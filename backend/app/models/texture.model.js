'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let textureSchema = new Schema({
	t_id : {
		type : Number,
		require : true,
		unique : true
	},
	type : {
		type : String,
		require : true
	},
	size : {
		type : Number,
		require : true,
	},
	amount : {
		type : Number,
		require : true,
	}
});

/**
 * Получить все текстуры из БД "textures"
 *
 * @param  {Object} user user info
 */
textureSchema.statics.getAllTextures = function () {
	return this.find().exec();
};

/**
 * Поиск максимального ID пользователя
 *
 */
textureSchema.statics.findMaxTextureId = function () {
	return this.findOne().sort({ t_id : -1 }).limit(1).exec();
};

module.exports = connection.model('Texture', textureSchema);
