'use strict';
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const errorhandler = require('errorhandler');
const cors = require('cors');

const logger = require('../config/logger.config');
const config = require('../config/app.config');
const router = require('../routers/server.router');

/**
 * The server.
 *
 * @class Server
 */
class Server {
	/**
	 * Фабричный статический метод. Выполняет создание экземпляра класса.
	 *
	 * @class Server
	 * @method bootstrap
	 * @static
	 *
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
		const methodName = 'setConfig';

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

		// Static files
		if (config.env === 'production') {
			this.srcPath = __dirname + '/../../../dist';
			logger.info(`${this.constructor.name} - ${methodName}`, 'srcPath', this.srcPath);
			this.app.use(express.static(this.srcPath));
		}
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

		this.app.use((req, res, next) => {
			res.set("Access-Control-Allow-Origin", '*');
			res.set("Access-Control-Allow-Headers", 'Content-Type, X-Auth-Token, Origin, Authorization, Allow');
			next();
		});

		if (config.env === 'production') {
			this.app.use((req, res, next) => {
				if (req.headers['x-forwarded-proto'] !== 'https') {
					return res.redirect(`https://${req.get('Host')}${req.url}`);
				}
				next();
			});
		}

		this.app.use('/', router);
		if (config.env === 'production') {
			this.app.get('/*', (req, res) => {
				res.sendFile(path.join(`${this.srcPath}/index.html`));
			});
		}
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
