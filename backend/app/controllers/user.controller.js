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
	 * Get all users from the collection 'users'.
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 *
	 * @class UserController
	 * @method getAllUsers
	 */
	 static getAllUsers (req, res) {
		 res.send('GetAllUsers!');
	 }

	 /**
 	 * Add user in the collection 'users'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class UserController
 	 * @method addUser
 	 */
 	 static addUser (req, res) {
 		 res.send('AddUser!');
 	 }

	 /**
 	 * Get user from the collection 'users'.
	 * Get param :id
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class UserController
 	 * @method getUser
 	 */
 	 static getUser (req, res) {
 		 res.send('GetUser!');
 	 }

	 /**
 	 * Update user in the collection 'users'.
	 * Get param :id
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class UserController
 	 * @method updateUser
 	 */
 	 static updateUser (req, res) {
 		 res.send('AddUser!');
 	 }

	 /**
 	 * Delete user from the collection 'users'.
	 * Get param :id
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class UserController
 	 * @method deleteUser
 	 */
 	 static deleteUser (req, res) {
 		 res.send('AddUser!');
 	 }
}

module.exports = UserController;
