let dotenv = require('dotenv');
dotenv.config({path: __dirname + '/../../.env'});

let config = {};

config.express = {
	port : process.env.EXPRESS_PORT || 3005
}
config.env = 'development';

if (process.env.NODE_ENV === 'production') {
	config.env = 'production';
	//... other config
}

module.exports = config;
