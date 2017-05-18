'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let surfaceSchema = require('./editor/surface.model').schema;
let thingSchema = require('./editor/thing.model').schema;

let projectSchema = new Schema({
	_uid : 			{ type : String, require : true },
	surfaces : 	{ type : [surfaceSchema], require : true },
	things : 		{ type : [thingSchema], require : true }
});

/**
 * Получить все элементы из БД "Items"
 *
 * @param  {none}
 */
projectSchema.statics.getAllItems = function () {
	return this.find().exec();
};

module.exports = connection.model('Project', projectSchema);
