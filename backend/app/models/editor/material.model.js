'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

/**
 * Схема документа "Цвет"
 */
 let colorDataSchema = new Schema({
 	red : 	{ type : Number, require : true },
 	green : { type : Number, require : true },
 	blue : 	{ type : Number, require : true },
 	alfa : 	{ type : Number, require : true }
 }, { _id : false });
let colorSchema = new Schema({
	data : { type : colorDataSchema, require : true }
}, { _id : false });

/**
 * Схема документа "Текстура"
 */
 let textureDataSchema = new Schema({
 	iid : 		{ type : String, require : true },
 	url : 		{ type : String, require : true },
 	width : 	{ type : Number, require : true },
 	height :	{ type : Number, require : true },
 	scale : 	{ type : Number, require : true },
 	angle : 	{ type : Number, require : true }
 }, { _id : false });
let textureSchema = new Schema({
	data : { type : textureDataSchema, require : true }
}, { _id : false });

/**
 * Схема документа "Материал"
 */
let materialSchema = new Schema({
	type : { type : String, require : true, trim : true, lowercase : true }
}, { discriminatorKey: 'type', _id : false });

let Material = mongoose.model('Material', materialSchema);
let MaterialColor = Material.discriminator('Color', colorSchema);
let MaterialTexture = Material.discriminator('Texture', textureSchema);

let data = new MaterialColor({
	data : {
		red : 255, green : 255, blue : 255, alfa : 1
	}
});
console.log(data.toString());

module.exports = {
	schema : materialSchema,
	model : mongoose.model('Material', materialSchema)
};
