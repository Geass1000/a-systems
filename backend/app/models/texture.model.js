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
	width : {
		type : Number,
		require : true,
	},
	height : {
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
	let sel = '_id type url width height';
	return type ? this.find({ type : { $in : type} }).select(sel).exec() :
								this.find().select(sel).exec();
};
textureSchema.statics.getAllTexturesTypes = function () {
	return this.find().distinct('type').exec();
};

module.exports = connection.model('Texture', textureSchema);
