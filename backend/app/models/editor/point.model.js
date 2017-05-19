'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let pointSchema = new Schema({
	x : { type : Number, required : true },
	y : { type : Number, required : true }
}, { _id : false });

module.exports = {
	schema : pointSchema,
	model : mongoose.model('Point', pointSchema)
};
