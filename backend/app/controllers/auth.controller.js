'use strict';

let logger = require('../config/logger.config');
let config = require('../config/app.config');

let User = require('../models/user.model');
let UserValidator = require('../validators/user.validator');

let Project = require('../models/project.model');

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
		let methodName = 'login';
		if (!info.login || !info.password) {
			return this.sendErrorResponse(res, 400, methodName, 'All fields required');
		}
		User.findUserLogin(info.login)
			.then((doc) => {
				if (!doc) {
					return this.sendErrorResponse(res, 400, methodName, 'A user with that username or email not exist');
				}
				if (!doc.validPassword(info.password)) {
					return this.sendErrorResponse(res, 400, methodName, 'The username(email) or password don\'t match');
				}

				logger.info('AuthController - login:', '200:Success');
				res.status(200).json({
					"token" : doc.createToken()
				});
			})
			.catch((err) => {
				if (err) {
					return this.sendErrorResponse(res, 500, methodName, 'Try sign in later');
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
		let methodName = 'addUser';
		if (!info.name || !info.email ||
				!(info.passwords && info.passwords.password)) {
			return this.sendErrorResponse(res, 400, methodName, 'All fields required');
		}
		if (!UserValidator.isLogin(info.name) ||
				!UserValidator.isEmail(info.email) ||
				!UserValidator.isPassword(info.passwords.password)) {
			return this.sendErrorResponse(res, 400, methodName, 'All fields must be correct');
		}
		User.findUserSignup(info)
			.then((doc) => {
				if (doc) {
					return this.sendErrorResponse(res, 400, methodName, 'A user with that username or email already exist');
				}

				let user = new User();
				user.nickname = info.name;
				user.name = info.name;
				user.email = info.email;
				user.setPassword(info.passwords.password);

				return user.save();
			})
			.then((user) => {
				res.status(201).json({
					"token" : user.createToken()
				});
			})
			.catch((err) => {
				if (err) {
					logger.warn(err);
					return this.sendErrorResponse(res, 500, methodName, 'Try sign up later');
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
		let methodName = 'getUser';

		let name = req.params.name.toString().trim().toLowerCase();

		logger.info(`AuthController - ${methodName}:`, `name -`, name);

		User.getUser(name)
			.then((data) => {
				if (data) {
					logger.info(`AuthController - ${methodName}:`, `data -`, data.toString());
				} else {
					throw new Error('The user isn\'t exist!');
				}

				data.avatar = config.user.avatarPath + data.avatar;
				logger.info(`AuthController - ${methodName}:`, '200:Success');
				res.status(200).json({ user : data });
			})
			.catch((err) => {
				if (err && err.message) {
					this.sendErrorResponse(res, 400, methodName, err.message);
				}
			});
	}

	sendErrorResponse (resp, code, method, message) {
		logger.warn(`AuthController - ${method}:`, `Status - ${code} -`, message);
		return resp.status(code).json({ 'error' : message });
	}
}

module.exports = new AuthController();
