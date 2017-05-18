'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let materialSchema = require('./material.model').schema;

let workspaceSchema = new Schema({
	x : 				{ type : Number, require : true },
	y : 				{ type : Number, require : true },
	width : 		{ type : Number, require : true },
	height : 		{ type : Number, require : true },
	material :	{ type : materialSchema, require : true },
}, { _id : false });

module.exports = {
	schema : workspaceSchema,
	model : mongoose.model('Workspace', workspaceSchema)
};
