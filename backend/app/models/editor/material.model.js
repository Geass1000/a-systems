'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

/**
 * Схема документа "Цвет"
 */
let colorSchema = new Schema({
	red : 	{ type : Number, require : true },
	green : { type : Number, require : true },
	blue : 	{ type : Number, require : true },
	alfa : 	{ type : Number, require : true }
}, { _id : false });

/**
 * Схема документа "Цвет"
 */
let textureSchema = new Schema({
	iid : 		{ type : String, require : true },
	url : 		{ type : String, require : true },
	width : 	{ type : Number, require : true },
	height :	{ type : Number, require : true },
	scale : 	{ type : Number, require : true },
	angle : 	{ type : Number, require : true }
}, { _id : false });

let materialDataSchema = new Schema({});
let MaterialData = mongoose.model('Material_Data', materialDataSchema);
let Color = MaterialData.discriminator('Color', colorSchema);
let Texture = MaterialData.discriminator('Texture', textureSchema);

let materialSchema = new Schema({
	type : { type : String, require : true },
	data : { type : materialDataSchema, require : true },
}, { _id : false });

module.exports = {
	schema : materialSchema,
	model : mongoose.model('Material', materialSchema)
};
