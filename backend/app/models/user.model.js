'use strict';

let crypto = require('crypto');

let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let config = require('../config/app.config');
let connection = require('../config/mongodb.database');
let UserValidator = require('../validators/user.validator');

let userSchema = new Schema({
	user_id : {
		type : Number,
		require : true,
		unique : true
	},
	name : {
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
		unique : true,
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
		name : this.name,
		email : this.email
	}, config.secret, { expiresIn : expires });
};

/**
 * Finding user in database "Users"
 *
 * @param  {Object} user user info
 */
userSchema.statics.findUserLogin = function (user) {
	return this.findOne({ $or: [ { name : user.name }, { email : user.email }, { email : user.name } ] }).exec();
};
userSchema.statics.findUserSignup = function (user) {
	return this.findOne({ $or: [ { name : user.name }, { email : user.email } ] }).exec();
};
/**
 * Finding max user id
 *
 */
userSchema.statics.findMaxUserId = function () {
	return this.findOne().sort({ user_id : -1 }).limit(1).exec();
};


module.exports = connection.model('User', userSchema);
