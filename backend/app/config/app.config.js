'use strict';

let dotenv = require('dotenv');
dotenv.config({path: __dirname + '/../../.env'});

let config = {};

config.env = 'development';
//... express
config.express = {
	port : process.env.EXPRESS_PORT || 3005
}
//... database
config.mongodb = {
	username : process.env.MONGODB_USERNAME,
	password : process.env.MONGODB_PASSWORD,
	host : process.env.MONGODB_HOST,
	port : process.env.MONGODB_PORT,
	database : process.env.MONGODB_DATABASE
}
//... crypto
config.salt = process.env.CRYPTO_SALT || null;
config.secret = process.env.CRYPTO_SECRET || null;
if (!config.salt || !config.secret)
	throw new Error("Config error!");

if (process.env.NODE_ENV === 'production') {
	config.env = 'production';
	//... other config
}

module.exports = config;
