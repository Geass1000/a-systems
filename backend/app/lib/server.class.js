'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let methodOverride = require('method-override');
let errorhandler = require('errorhandler');

let config = require('../config/app.config');

let router = require('../routes/server.route');

let mongoose = require('mongoose');
let userSchema = require('../../app/models/user.model');

/**
 * The server.
 *
 * @class Server
 */
class Server {
	/**
	 * Bootstrap the server.
	 *
	 * @class Server
	 * @method bootstrap
	 * @static
	 * @return {Server}  Return object server
	 */
	static bootstrapServer () {
		return new Server();
	}

	/**
	 * Constructor.
	 *
	 * @class Server
	 * @constructor
	 */
	constructor () {
		this.model = {};

		this.app = express();

		this.setConfig();

		this.setRoutes();

		this.startServer();
	}


	/**
	 * Configure server.
	 *
	 * @class Server
	 * @method setConfig
	 */
	setConfig () {
		console.log('Configure server...');
		if (config.env === 'development')
			this.app.use(logger('dev'));

		//this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		this.app.use(methodOverride());

		let connInfo = `mongodb://${config.mongodb.username}:` +
														 `${config.mongodb.password}@` +
														 `${config.mongodb.host}:` +
														 `${config.mongodb.port}/` +
														 `${config.mongodb.database}`;
		mongoose.Promise = global.Promise;
		let conn = mongoose.createConnection(connInfo);

		this.model.user = conn.model('User', userSchema);
	}

	/**
	 * Setting routes.
	 *
	 * @class Server
	 * @method setRoutes
	 */
	setRoutes () {
		console.log('Setting routes...');

		this.app.use('/', router);
	}

	/**
	 * Start server.
	 *
	 * @class Server
	 * @method startServer
	 */
	startServer () {
		this.app.use(function(err, req, res, next) {
			if (err.name === 'StatusError') res.send(err.status, err.message);
			else next(err);
		});

		if (config.env === 'development')
			this.app.use(errorhandler());

		console.log('Starting server...');
		this.app.listen(config.express.port, function (err) {
			console.log(`listening in http://localhost:${config.express.port}`);
		});
	}
}

module.exports = Server;
