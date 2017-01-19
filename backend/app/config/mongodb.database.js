'use strict';

let config = require('./app.config');

let mongoose = require('mongoose');

console.log('Connecting to a MongoDB...');
let connInfo = `mongodb://${config.mongodb.username}:` +
												 `${config.mongodb.password}@` +
												 `${config.mongodb.host}:` +
												 `${config.mongodb.port}/` +
												 `${config.mongodb.database}`;
mongoose.Promise = global.Promise;
let connection = mongoose.createConnection(connInfo);

module.exports = connection;
