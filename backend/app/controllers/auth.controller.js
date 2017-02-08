'use strict';

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
	constructor () { ; }

	/**
	 * Create JWT token session.
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 *
	 * @class AuthController
	 * @method login
	 */
	static login (req, res) {
		let info = req.body;
		if (!((info.name || info.email) && info.password)) {
			res.status(400).json({ "message" : "All fields required" });
			return;
		}
		User.findExisteUser(info, (err, doc) => {
			if (err) {
				res.status(500).json({ "message" : "Try sign up later" });
				return;
			}
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
	static addUser (req, res) {
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

		User.findExisteUser(info, (err, doc) => {
			if (err) {
				res.status(500).json({ "message" : "Try sign up later" });
				return;
			}
			if (doc) {
				res.status(400).json({ "message" : "A user with that username or email already exists" });
				return;
			}

			let user = new User();
			user.name = info.name;
			user.email = info.email;
			user.setPassword(info.password);
			user.save((err) => {
				if (err) {
					res.status(500).json({ "message" : "Try sign up later" });
					return;
				}
				res.status(201).json({
					"token" : user.createToken()
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
 	 * @class AuthController
 	 * @method getUser
 	 */
	static getUser (req, res) {
		res.send('GetUser!');
	}
}

module.exports = AuthController;
