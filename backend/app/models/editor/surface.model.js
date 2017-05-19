'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let materialSchema = require('./material.model').schema;
let pointSchema = require('./point.model').schema;

let surfaceSchema = new Schema({
	id : 			{ type : Number, required : true },
	x : 			{ type : Number, required : true },
	y : 			{ type : Number, required : true },
	stroke : 	{ type : materialSchema, required : true },
	fill : 		{ type : materialSchema, required : true },
	points : 	{ type : [pointSchema], required : true }
}, { _id : false });

module.exports = {
	schema : surfaceSchema,
	model : mongoose.model('Surface', surfaceSchema)
};
