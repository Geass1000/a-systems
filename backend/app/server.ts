import * as express from "express";

export class Server {

	public app : express.createApplication;

	/**
	 * Constructor.
	 *
	 * @class Server
	 * @constructor
	 */
	constructor () {
		this.app = express();
	}


	/**
	 * Configure application
	 *
	 * @class Server
	 * @method config
	 */
	public config () {

	}

	/**
	 * Create and return Router
	 *
	 * @class Server
	 * @method routes
	 */
	public routes () {

	}
}
