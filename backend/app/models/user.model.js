'use strict';

let crypto = require('crypto');

let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let config = require('../config/app.config');
let connection = require('../config/mongodb.database');
let UserValidator = require('../validators/user.validator');

let userSchema = new Schema({
	login : {
		type : String,
		require : true,
		unique : true,
		validate : UserValidator.isLogin
	},
	hash : { type : String },
	salt : { type : String },
	email : {
		type : String,
		require : true,
		validate : UserValidator.isEmail
	},
	created_at : {
		type : Date,
		default : Date.now
	}
});

/**
 * Set in instance model "Users" password (hash, salt)
 *
 * @param  {String} password user password
 */
userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt + config.salt, 1000, 512, 'sha512').toString('hex');
};

/**
 * Valid password in instance model "Users"
 *
 * @param  {String} password user password
 */
userSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt + config.salt, 1000, 512, 'sha512').toString('hex');
	return this.hash === hash;
};

/**
 * Create JWT token from data instance model "Users"
 *
 * @param  {String} password user password
 */
userSchema.methods.createToken = function () {
	let expires = 604800; // 60s * 60m * 24h * 7d = 604800s (7 days)
	return jwt.sign({
		login : this.login,
		email : this.email
	}, config.secret, { expiresIn : expires });
};

/**
 * Findign user in database "Users"
 *
 * @param  {String} password user password
 */
userSchema.statics.findExisteUser = function (user, cb) {
	return this.findOne({ $or: [ { login : user.login}, { email : user.email } ] }, cb);
};

module.exports = connection.model('User', userSchema);
