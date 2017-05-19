'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

/**
 * Схема документа "Материал"
 */
let materialSchema = new Schema({
	type : { type : String, required : true, trim : true, lowercase : true },
	data : { type : Schema.Types.Mixed }
}, { _id : false });

module.exports = {
	schema : materialSchema,
	model : mongoose.model('Material', materialSchema)
};
