'use strict';

let User = require('../models/user.model');
let UserValidator = require('../validators/user.validator');

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
		let info = req.body;
		if (!info.login || !info.email || !info.password) {
			res.status(400).json({
				"message" : "All fields required"
			});
			return;
		}
		if (!UserValidator.isLogin(info.login) ||
				!UserValidator.isEmail(info.email) ||
				!UserValidator.isPassword(info.password)) {
			res.status(400).json({
				"message" : "All fields must be correct"
			});
			return;
		}

		User.checkUser(info, (err, doc) => {
			if (err) {
				res.status(400).json({
					"message" : "Try sign up later"
				});
				return;
			}
			if (doc) {
				res.status(400).json({
					"message" : "A user with that username or email already exists"
				});
				return;
			}

			let user = new User();
			user.login = info.login;
			user.email = info.email;
			user.setPassword(info.password);
			let token = user.createToken();

			user.save((err) => {
				if (err) {
					res.status(400).json({
						"message" : "Try sign up later"
					});
					return;
				}
				res.status(201).json({
					"token" : token
				});
			});
		});
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
