'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('morgan');
let methodOverride = require('method-override');
let errorhandler = require('errorhandler');

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
		if (process.env.NODE_ENV === 'development')
			this.app.use(logger('dev'));

		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.app.use(bodyParser.json());

		this.app.use(methodOverride());
	}

	/**
	 * Create and return Router.
	 *
	 * @class Server
	 * @method setRoutes
	 */
	setRoutes () {

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

		this.app.listen(this.port, function (err) {
			console.log(`listening in http://localhost: ${this.port}`);
		}.bind(this));
	}
}

module.exports = Server;
