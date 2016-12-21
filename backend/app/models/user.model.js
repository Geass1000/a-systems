'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserValidator = require('../validators/user.validator');

let userSchema = new Schema({
	login:  {
		type : String,
		require : true,
		unique : true,
		validate : UserValidator.isLogin
	},
	password: {
		type : String,
		require : true,
		select : false,
		validate : UserValidator.isPassword
	},
	email: {
		type : String,
		require : true,
		validate : UserValidator.isEmail
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

userSchema.static.getUser = (login, cb) => {
	return this.findOne({ login : new RegExp(name, i) }, cb);
};

module.exports = userSchema;
