'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../../config/mongodb.database');

let pointSchema = new Schema({
	x : { type : Number, require : true },
	y : { type : Number, require : true }
}, { _id : false });

module.exports = {
	schema : pointSchema,
	model : mongoose.model('Point', pointSchema)
};
