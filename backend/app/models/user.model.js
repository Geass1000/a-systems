'use strict';

let crypto = require('crypto');

let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let config = require('../config/app.config');
let connection = require('../config/mongodb.database');
let UserValidator = require('../validators/user.validator');

let userSchema = new Schema({
	name : {
		type : String,
		required : true,
		unique : true,
		lowercase : true,
		trim : true,
		validate : UserValidator.isLogin
	},
	nickname : {
		type : String,
		required : true,
		trim : true,
		validate : UserValidator.isLogin
	},
	hash : { type : String },
	salt : { type : String },
	email : {
		type : String,
		required : true,
		unique : true,
		validate : UserValidator.isEmail
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	avatar : {
		type : String,
		default : 'default.png'
	},
	firstname : {
		type : String
	},
	lastname : {
		type : String
	}
});

/**
 * Set in instance model "Users" password (hash, salt)
 *
 * @param  {String} password user password
 */
userSchema.methods.setPassword = function (password) {
	if (typeof password !== 'string') {
		return;
	}
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
		_id : this._id,
		name : this.nickname
	}, config.secret, { expiresIn : expires });
};

/**
 * Поис пользователя в базе данных "users"
 *
 * @param  {Object} user user info
 */
userSchema.statics.findUserSignup = function (user) {
	let name = user.name.toLowerCase();
	return this.findOne({ $or: [ { name : name }, { email : user.email } ] }).exec();
};
userSchema.statics.findUserData = function (user) {
	return this.findOne({ name : user.name }).exec();
};

userSchema.statics.findUserLogin = function (user) {
	let name = user.nickname.toString().toLowerCase();
	return this.findOne({ $or: [ { name : name }, { email : name } ] }).exec();
};

/**
 * Получить все текстуры из БД "textures"
 *
 * @param  {Object} user user info
 */
userSchema.statics.getUser = function (name) {
	let sel = '_id nickname email created_at avatar firstname lastname';
	return name ? this.findOne({ name : name }).select(sel).exec() :
								new Promise((resolve, reject) => resolve());
};

module.exports = connection.model('User', userSchema);
