'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let materialSchema = require('./material.model').schema;

let workspaceSchema = new Schema({
	x : 				{ type : Number, required : true },
	y : 				{ type : Number, required : true },
	width : 		{ type : Number, required : true },
	height :		{ type : Number, required : true },
	material :	{ type : materialSchema, required : true },
}, { _id : false });

module.exports = {
	schema : workspaceSchema,
	model : mongoose.model('Workspace', workspaceSchema)
};
