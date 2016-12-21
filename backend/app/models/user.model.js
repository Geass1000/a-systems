'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
	login:  { type : String, require : true, unique : true },
	password: { type : String, require : true, select : false },
	created_at: { type: Date, default: Date.now },
});

userSchema.static.getUser = (login, cb) => {
	return this.findOne({ login : new RegExp(name, i) }, cb);
};

module.exports = userSchema;
