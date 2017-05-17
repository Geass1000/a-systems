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
		let error = '';
		if (!info.login || !info.password) {
			error = 'All fields required';
			logger.warn('AuthController - login:', '400:Bad Request', error);
			res.status(400).json({ 'error' : error });
			return;
		}
		User.findUserLogin(info.login)
			.then((doc) => {
				if (!doc) {
					error = 'A user with that username or email not exists';
					logger.warn('AuthController - login:', '400:Bad Request', error);
					res.status(400).json({ 'error' : error });
					return;
				}
				if (!doc.validPassword(info.password)) {
					error = 'The username(email) or password don\'t match';
					logger.warn('AuthController - login:', '400:Bad Request', error);
					res.status(400).json({ 'error' : error });
					return;
				}

				logger.info('AuthController - login:', '200:Success');
				res.status(200).json({
					"token" : doc.createToken()
				});
			})
			.catch((err) => {
				if (err) {
					error = 'Try sign in later';
					logger.error('AuthController - login:', '500:Error', error);
					res.status(500).json({ 'error' : error });
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
		let error = '';
		if (!info.name || !info.email ||
				!(info.passwords && info.passwords.password)) {
			error = 'All fields required';
			logger.warn('AuthController - login:', '400:', error);
			res.status(400).json({ 'error' : error });
			return;
		}
		if (!UserValidator.isLogin(info.name) ||
				!UserValidator.isEmail(info.email) ||
				!UserValidator.isPassword(info.passwords.password)) {
			error = 'All fields must be correct';
			logger.warn('AuthController - login:', '400:', error);
			res.status(400).json({ 'error' : error });
			return;
		}
		User.findUserSignup(info)
			.then((doc) => {
				if (doc) {
					error = 'A user with that username or email already exist';
					logger.warn('AuthController - login:', '400:', error);
					res.status(400).json({ 'error' : error });
					return;
				}

				let user = new User();
				user.alias = info.name;
				user.name = info.name.toLowerCase();
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
							error = 'Try sign up later';
							logger.warn('AuthController - login:', '500:', error);
							res.status(500).json({ 'error' : error });
							return;
						}
					});
			})
			.catch((err) => {
				if (err) {
					error = 'Try sign up later';
					logger.warn('AuthController - login:', '500:', error);
					res.status(500).json({ 'error' : error });
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
	addUser2 (req, res) {
		let info = req.body;
		if (!(info.name && info.email && info.password)) {
			res.status(400).json({ "error" : "All fields required" });
			return;
		}
		if (!UserValidator.isLogin(info.name) ||
				!UserValidator.isEmail(info.email) ||
				!UserValidator.isPassword(info.password)) {
			res.status(400).json({ "error" : "All fields must be correct"	});
			return;
		}
		User.findUserSignup(info)
			.then((doc) => {
				if (doc) {
					res.status(400).json({ "error" : "A user with that username or email already exists" });
					return;
				}

				let user = new User();
				user.alias = info.name;
				user.name = info.name.toLowerCase();
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
							res.status(500).json({ "error" : "Try sign up later" });
							return;
						}
					});
			})
			.catch((err) => {
				if (err) {
					console.log(err);
					res.status(500).json({ "error" : "Try sign up later" });
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
		res.status(200).json({ "message" : "Try" });
	}
}

module.exports = new AuthController();
