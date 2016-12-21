let dotenv = require('dotenv');
dotenv.config({path: __dirname + '/../../.env'});

let config = {};

config.env = 'development';
config.express = {
	port : process.env.EXPRESS_PORT || 3005
}
config.mongodb = {
	username : process.env.MONGODB_USERNAME,
	password : process.env.MONGODB_PASSWORD,
	host : process.env.MONGODB_HOST,
	port : process.env.MONGODB_PORT,
	database : process.env.MONGODB_DATABASE
}

if (process.env.NODE_ENV === 'production') {
	config.env = 'production';
	//... other config
}

module.exports = config;
