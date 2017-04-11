'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let textureTypeSchema = new Schema({
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
textureTypeSchema.statics.getAllTextureTypes = function () {
	return this.find().exec();
};

module.exports = connection.model('Texture_Type', textureTypeSchema);
