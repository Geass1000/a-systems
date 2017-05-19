'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let thingSchema = new Schema({
	id : 			{ type : Number, required : true },
	x : 			{ type : Number, required : true },
	y : 			{ type : Number, required : true },
	width : 	{ type : Number, required : true },
	height : 	{ type : Number, required : true },
	angle : 	{ type : Number, required : true },
	url : 		{ type : String, required : true }
}, { _id : false });

module.exports = {
	schema : thingSchema,
	model : mongoose.model('Thing', thingSchema)
};
