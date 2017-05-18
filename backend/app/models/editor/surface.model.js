'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let materialSchema = require('./material.model').schema;
let pointSchema = require('./point.model').schema;

let surfaceSchema = new Schema({
	id : 			{ type : Number, require : true },
	x : 			{ type : Number, require : true },
	y : 			{ type : Number, require : true },
	stroke : 	{ type : materialSchema, require : true },
	fill : 		{ type : materialSchema, require : true },
	points : 	{ type : [pointSchema], require : true }
}, { _id : false });

module.exports = {
	schema : surfaceSchema,
	model : mongoose.model('Surface', surfaceSchema)
};
