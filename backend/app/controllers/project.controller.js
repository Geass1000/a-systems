'use strict';

const path = require('path');
let scriptName = path.basename(__filename, path.extname(__filename));

const logger = require('../config/logger.config');

const BaseController = require('../lib/base-controller.class');
const AppError = require('../lib/app-error.class');

const Project = require('../models/project.model');

/**
 * Контроллер редактора.
 *
 * @class ProjectController
 */
class ProjectController extends BaseController {
	/**
	 * Конструктор. Получение из БД максимального ID.
	 *
	 * @class ProjectController
	 * @constructor
	 */
	constructor () {
		super(scriptName);
	}


	/**
	 * getProject - функция-контроллер, выполняет обработку запроса о получении данных
	 * проекта с идентификатором id.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getProject (req, res) {
		let message, methodName = 'getProject';

		let id = req.params.id.toString().trim().toLowerCase();
		logger.info(`${this.constructor.name} - ${methodName}:`, `id -`, id);

		Project.getProject(id)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist', 404);
				}

				message = 'Return project info.';
				this.sendSuccessResponse(res, 200, { project : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * getProjects - функция-контроллер, выполняет обработку запроса о получении списка
	 * проектов. Если указывается query параметр "uid", то осуществляется поиск всех
	 * пороектов определённого пользователя.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getProjects (req, res) {
		let message, methodName = 'getProject';

		let uid = req.query.uid ? req.query.uid : null;
		logger.info(`${this.constructor.name} - ${methodName}:`, `uid -`, uid);

		Project.getProjects(uid)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist', 404);
				}

				message = 'Return list project.';
				this.sendSuccessResponse(res, 200, { projects : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * postProject - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * проекта в БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	postProject (req, res) {
		let message, methodName = 'postProject';

		let body = req.body;
		let user = req.user;

		if (body._id) {
			if (body._uid === user._id) {
				logger.info(`${this.constructor.name} - ${methodName}:`, 'No create');
				return this.sendErrorResponse(res, new AppError('myExist', 400), methodName);
			} else {
				logger.info(`${this.constructor.name} - ${methodName}:`, 'Recreate');
				body._uid = user._id;
			}
		} else {
			logger.info(`${this.constructor.name} - ${methodName}:`, 'Create');
			body._uid = user._id;
		}
		delete body._id;

		let project = new Project(body);
		logger.info(project.toString());
		project.save()
			.then((data) => {
				logger.info(`${this.constructor.name} - ${methodName}:`, '201 -', 'Create project.');

				let result = {
					_id : data._id.toString(),
					_uid : data._uid.toString()
				};
				message = 'Create project.';
				this.sendSuccessResponse(res, 201, { project : result }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * postProject - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * проекта в БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	putProject (req, res) {
		let message, methodName = 'putProject';

		let id = req.params.id.toString().trim().toLowerCase();

		let body = req.body;
		let user = req.user;

		if (body._uid !== user._id) {
			this.postProject(req, res);
			return ;
		}

		let opt = { upsert : true };
		Project.update({ _id : id }, body, opt).exec()
			.then((data) => {
				let result = {
					_id : body._id.toString(),
					_uid : body._uid.toString()
				};

				message = 'Update project.';
				this.sendSuccessResponse(res, 200, { project : result }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}
}

module.exports = new ProjectController();
