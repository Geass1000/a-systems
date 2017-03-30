'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let textureSchema = new Schema({
	type : {
		type : String,
		require : true
	},
	url : {
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
textureSchema.statics.getAllTextures = function (type) {
	let sel = '_id type url size amount';
	return type ? this.find({ type : { $in : type} }).select(sel).exec() :
								this.find().select(sel).exec();
};

module.exports = connection.model('Texture', textureSchema);
