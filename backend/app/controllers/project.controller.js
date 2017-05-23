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
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getProject (req, res) {
		let methodName = 'getProject';

		let id = req.params.id.toString().trim().toLowerCase();
		logger.info(`${this.constructor.name} - ${methodName}:`, `id -`, id);

		Project.getProject(id)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist');
				}

				logger.info(`${this.constructor.name} - ${methodName}:`, '200 -', 'Return project info');
				res.status(200).json({ project : data });
			})
			.catch((err) => {
				if (err) {
					let message = this.mongoError.getErrorMessage(err, methodName);
					this.sendErrorResponse(res, 500, methodName, message);
				}
			});
	}

	/**
	 * getProjects - функция-контроллер, выполняет обработку запроса о получении списка
	 * проектов. Если указывается query параметр "uid", то осуществляется поиск всех
	 * пороектов определённого пользователя.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getProjects (req, res) {
		let methodName = 'getProject';

		let uid = req.query.uid ? req.query.uid : null;
		logger.info(`${this.constructor.name} - ${methodName}:`, `uid -`, uid);

		Project.getProjects(uid)
			.then((data) => {
				if (!data) {
					throw new AppError('myNotExist');
				}

				logger.info(`${this.constructor.name} - ${methodName}:`, '200 -', 'Return list project');
				res.status(200).json({
				 	projects : data
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
	 * postProject - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * проекта в БД.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	postProject (req, res) {
		let methodName = 'postProject';

		let body = req.body;
		let user = req.user;

		if (body._id) {
			if (body._uid === user._id) {
				logger.info(`${this.constructor.name} - ${methodName}:`, 'No create');
				this.sendErrorResponse(res, 400, methodName, 'The project is already exist');
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
				res.status(201).json({
					project : result
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
	 * postProject - функция-контроллер, выполняет обработку запроса о добавлении нового
	 * проекта в БД.
	 *
	 * @kind {function}
	 * @method
	 *
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	putProject (req, res) {
		let methodName = 'putProject';

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

				logger.info(`${this.constructor.name} - ${methodName}:`, '200 -', 'Update project.');
				res.status(200).json({
					project : result
				});
			})
			.catch((err) => {
				if (err) {
					let message = this.mongoError.getErrorMessage(err, methodName);
					this.sendErrorResponse(res, 500, methodName, message);
				}
			});
	}
}

module.exports = new ProjectController();
