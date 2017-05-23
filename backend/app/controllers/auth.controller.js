'use strict';

const path = require('path');

const logger = require('../config/logger.config');
const config = require('../config/app.config');

const BaseController = require('../lib/base-controller.class');

const User = require('../models/user.model');

let scriptName = path.basename(__filename, path.extname(__filename));

/**
 * The sign up controller.
 *
 * @class AuthController
 */
class AuthController extends BaseController {
	/**
	 * Constructor.
	 *
	 * @class AuthController
	 * @constructor
	 */
	constructor () {
		super(scriptName);
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
	postLogin (req, res) {
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
	 * postUser - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * пользователя в БД.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	postUser (req, res) {
		let methodName = 'postUser';

		let body = req.body;

		let user = new User(body);
		user.nickname = body.name;
		if (body.passwords) {
			user.setPassword(body.passwords.password);
		}

		user.save()
			.then((data) => {
				logger.info(`${this.constructor.name} - ${methodName}:`, '201', 'Create user.');
				res.status(201).json({
					"token" : data.createToken()
				});
			})
			.catch((err) => {
				if (err) {
					let message = this.mongoError.getErrorMessage(err, methodName);
					this.sendErrorResponse(res, 500, methodName, message);
				}
			});
	}

	/**
	 * getUser - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о пользователе из БД.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getUser (req, res) {
		let methodName = 'getUser';

		let name = req.params.name.toString().trim().toLowerCase();
		logger.info(`AuthController - ${methodName}:`, `name -`, name);

		User.getUser(name)
			.then((data) => {
				if (data) {
					logger.info(`${this.constructor.name} - ${methodName}:`, `data -`, data.toString());
				} else {
					throw new Error('The user isn\'t exist!');
				}

				data.avatar = config.user.avatarPath + data.avatar;
				logger.info(`${this.constructor.name} - ${methodName}:`, '200:Return user info');
				res.status(200).json({ user : data });
			})
			.catch((err) => {
				if (err) {
					let message = this.mongoError.getErrorMessage(err, methodName);
					this.sendErrorResponse(res, 500, methodName, message);
				}
			});
	}
}

module.exports = new AuthController();
