'use strict';

let config = {};

config.env = 'production';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	let dotenv = require('dotenv');
	dotenv.config({path: __dirname + '/../../../.env'});
	config.env = 'development';
}

//... express
config.express = {
	port : process.env.PORT || 5000
};
//... database
config.mongodb = {
	username : process.env.MONGODB_USERNAME,
	password : process.env.MONGODB_PASSWORD,
	host : process.env.MONGODB_HOST,
	port : process.env.MONGODB_PORT,
	database : process.env.MONGODB_DATABASE
};
//... crypto
config.salt = process.env.CRYPTO_SALT || null;
config.secret = process.env.CRYPTO_SECRET || null;

if (!config.salt || !config.secret) {
	throw new Error("Config error!");
};
//... user
config.user = {
	avatarPath : process.env.USER_AVATAR_PATH || 'assets/imgs/avatars'
};

if (process.env.NODE_ENV === 'production') {
	config.env = 'production';
	//... other config
}

module.exports = config;
