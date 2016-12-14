import * as express from "express";

export default class Server {

	public app : any;

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
		console.log("Hell");
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
