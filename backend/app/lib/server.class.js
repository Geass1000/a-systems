'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let methodOverride = require('method-override');
let errorhandler = require('errorhandler');
let cors = require('cors');

let logger = require('../config/logger.config');

let config = require('../config/app.config');

let router = require('../routers/server.router');

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
		this.db = {};

		this.app = express();

		this.setConfig();

		this.setRoutes();

		this.startServer();
	}


	/**
	 * setConfig - выполняет конфигурацию сервера.
	 *
	 * @method
	 *
	 * @return {void}
	 */
	setConfig () {
		logger.info('Configuring server...');
		if (config.env === 'development')
			this.app.use(morgan('dev'));

		// Parse body request to a json
		this.app.use(bodyParser.json());
		//this.app.use(bodyParser.urlencoded({ extended: true }));

		// Get default methods put and delete
		this.app.use(methodOverride());

		// Use CORS technology
		this.app.use(cors());

		// Create connect to a database
		this.db.mongodb = require('../config/mongodb.database');
	}

	/**
	 * setRoutes - выполняет установку маршрутов роутеров.
	 *
	 * @method
	 *
	 * @return {void}
	 */
	setRoutes () {
		logger.info('Setting routes...');

		this.app.use('/', router);
	}

	/**
	 * startServer - выполняет запуск сервера.
	 *
	 * @method
	 *
	 * @return {void}
	 */
	startServer () {
		this.app.use(function(err, req, res, next) {
			if (err.name === 'StatusError') res.send(err.status, err.message);
			else next(err);
		});

		if (config.env === 'development')
			this.app.use(errorhandler());

		logger.info('Starting server...');
		this.app.listen(config.express.port, function (err) {
			logger.info(`listening in http://localhost:${config.express.port}`);
		});
	}
}

module.exports = Server;
