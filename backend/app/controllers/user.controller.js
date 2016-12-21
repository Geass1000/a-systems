'use strict';

/**
 * The sign up controller.
 *
 * @class UserController
 */
class UserController {
	/**
	 * Create the UserController object.
	 *
	 * @class UserController
	 * @method create
	 * @static
	 * @return {Route}  Return object UserController
	 */
	static create () {
		return new UserController();
	}

	/**
	 * Constructor.
	 *
	 * @class UserController
	 * @constructor
	 */
	constructor () { ; }

	/**
	 * Sign up user.
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 *
	 * @class Server
	 * @method index
	 */
	 static signup (req, res) {
		 res.send('Hello from sign up!')
	 }
	 static log (req, res, next) {
		 console.log("hello");
		 next();
	 }
}

module.exports = UserController;
