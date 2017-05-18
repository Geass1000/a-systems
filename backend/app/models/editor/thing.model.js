'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let thingSchema = new Schema({
	id : 			{ type : Number, require : true },
	x : 			{ type : Number, require : true },
	y : 			{ type : Number, require : true },
	width : 	{ type : Number, require : true },
	height : 	{ type : Number, require : true },
	angle : 	{ type : Number, require : true },
	url : 		{ type : String, require : true }
}, { _id : false });

module.exports = {
	schema : thingSchema,
	model : mongoose.model('Thing', thingSchema)
};
