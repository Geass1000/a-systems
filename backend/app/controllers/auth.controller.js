'use strict';

let logger = require('../config/logger.config');

let User = require('../models/user.model');
let UserValidator = require('../validators/user.validator');

/**
 * The sign up controller.
 *
 * @class AuthController
 */
class AuthController {
	/**
	 * Constructor.
	 *
	 * @class AuthController
	 * @constructor
	 */
	constructor () {
	}

	/**
	 * Create JWT token session.
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 *
	 * @class AuthController
	 * @method login
	 */
	login (req, res) {
		let info = req.body;
		if (!((info.name || info.email) && info.password)) {
			res.status(400).json({ "message" : "All fields required" });
			return;
		}
		User.findUserLogin(info)
			.then((doc) => {
				if (!doc) {
					res.status(400).json({ "message" : "A user with that username or email not exists" });
					return;
				}
				if (!doc.validPassword(info.password)) {
					res.status(400).json({ "message" : "The username(email) or password don't match" });
					return;
				}

				res.status(200).json({
					"token" : doc.createToken()
				});
			})
			.catch((err) => {
				if (err) {
					res.status(500).json({ "message" : "Try sign up later" });
					return;
				}
			});
	}

	/**
 	 * Add user in the database 'users'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class AuthController
 	 * @method addUser
 	 */
	addUser (req, res) {
		let info = req.body;
		if (!(info.name && info.email && info.password)) {
			res.status(400).json({ "message" : "All fields required" });
			return;
		}
		if (!UserValidator.isLogin(info.name) ||
				!UserValidator.isEmail(info.email) ||
				!UserValidator.isPassword(info.password)) {
			res.status(400).json({ "message" : "All fields must be correct"	});
			return;
		}
		User.findUserSignup(info)
			.then((doc) => {
				if (doc) {
					res.status(400).json({ "message" : "A user with that username or email already exists" });
					return;
				}

				let user = new User();
				user.name = info.name;
				user.email = info.email;
				user.setPassword(info.password);
				user.save()
					.then((doc) => {
						res.status(201).json({
							"token" : user.createToken()
						});
					})
					.catch((err) => {
						if (err) {
							console.log(err);
							res.status(500).json({ "message" : "Try sign up later" });
							return;
						}
					});
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					res.status(500).json({ "message" : "Try sign up later" });
					return;
				}
			});
	}

	/**
 	 * Get user from the collection 'users'.
	 * Get param :id
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class AuthController
 	 * @method getUser
 	 */
	getUser (req, res) {
		logger.info('AuthController: getUser', JSON.stringify(req.user));
		res.send('GetUser!');
	}
}

module.exports = new AuthController();
