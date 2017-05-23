'use strict';

const path = require('path');
let scriptName = path.basename(__filename, path.extname(__filename));

const config = require('../config/app.config');

const BaseController = require('../lib/base-controller.class');
const AppError = require('../lib/app-error.class');

const User = require('../models/user.model');

/**
 * The sign up controller.
 *
 * @class UserController
 */
class UserController extends BaseController {
	/**
	 * Constructor.
	 *
	 * @class UserController
	 * @constructor
	 */
	constructor () {
		super(scriptName);
	}

	/**
	 * postLogin - функция-контроллер, выполняет обработку запроса о входе пользователя
	 * в систему.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	postLogin (req, res) {
		let methodName = 'postLogin';

		let body = req.body;
		if (!body || !body.nickname || !body.password) {
			return this.sendErrorResponse(res, 400, methodName, 'All fields required');
		}

		User.findUserLogin(body)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist');
				}
				if (!data.validPassword(body.password)) {
					throw new AppError('myNotMatch');
				}

				this.logger.info(`${this.constructor.name} - ${methodName}:`, '200 -', 'Logging in');
				res.status(200).json({
					"token" : data.createToken()
				});
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * postUser - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * пользователя в БД.
	 *
	 * @method
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
				this.logger.info(`${this.constructor.name} - ${methodName}:`, '201 -', 'Create user.');
				res.status(201).json({
					"token" : data.createToken()
				});
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * getUser - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о пользователе из БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getUser (req, res) {
		let methodName = 'getUser';

		let name = req.params.name.toString().trim().toLowerCase();
		this.logger.info(`${this.constructor.name} - ${methodName}:`, `name -`, name);

		User.getUser(name)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist');
				}

				data.avatar = config.user.avatarPath + data.avatar;
				this.logger.info(`${this.constructor.name} - ${methodName}:`, '200 -', 'Return user info');
				res.status(200).json({ user : data });
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}
}

module.exports = new UserController();
