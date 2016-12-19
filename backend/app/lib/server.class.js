'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let methodOverride = require('method-override');
let errorhandler = require('errorhandler');

let dotenv = require('dotenv');
dotenv.config({path: __dirname + '/../../.env'});

let Route = require('../routes/server.routing');

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
		this.app = express();
		this.port = process.env.PORT || 3005;

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
		if (process.env.NODE_ENV === 'development')
			this.app.use(logger('dev'));

		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());

		this.app.use(methodOverride());
	}

	/**
	 * Setting routes.
	 *
	 * @class Server
	 * @method setRoutes
	 */
	setRoutes () {
		console.log('Setting routes...');
		this.setRouteMethod(Route.get(), this.app.get.bind(this.app), 'GET');
		this.setRouteMethod(Route.post(), this.app.post.bind(this.app), 'POST');
		this.setRouteMethod(Route.put(), this.app.put.bind(this.app), 'PUT');
		this.setRouteMethod(Route.delete(), this.app.delete.bind(this.app), 'DELETE');
	}

	/**
	 * Setting routes for one method.
	 *
	 * @class Server
	 * @method setRouteMethod
	 */
	setRouteMethod(data, method, name) {
		data.map((d1) => {
			if (typeof d1.middleware === 'function') {
				method(d1.path, (req, res, next) => {
					d1.middleware(req, res);
					next();
				});
			}
			else if (d1.middleware) {
				d1.middleware.map((d2) => {
					method(d1.path, (req, res, next) => {
						d2(req, res);
						next();
					});
				});
			}

			method(d1.path, d1.controller);
			console.log(`Set ${name} path: ${d1.path}`);
		});
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

		if (process.env.NODE_ENV === 'development')
			this.app.use(errorhandler());

		console.log('Starting server...');
		this.app.listen(this.port, function (err) {
			console.log(`listening in http://localhost:${this.port}`);
		}.bind(this));
	}
}

module.exports = Server;
