import * as express from "express";

export default class Server {
	public app : any;

	/**
	 * Bootstrap the server
	 *
	 * @class Server
	 * @method bootstrap
	 * @static
	 * @return {Server}  Return object server
	 */
	public static bootstrapServer () {
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

		console.log("Starting server...");
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
