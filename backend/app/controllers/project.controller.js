'use strict';

let logger = require('../config/logger.config');

let Project = require('../models/project.model');

let className = 'ProjectController';

/**
 * Контроллер редактора.
 *
 * @class ProjectController
 */
class ProjectController {
	/**
	 * Конструктор. Получение из БД максимального ID.
	 *
	 * @class ProjectController
	 * @constructor
	 */
	constructor () {
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

		logger.info(`AuthController - ${methodName}:`, `id -`, id);

		Project.getProject(id)
			.then((data) => {
				if (data) {
					logger.info(`ProjectController - ${methodName}:`, `data -`, data.toString());
				} else {
					throw new Error('The project with that id not exist!');
				}

				logger.info(`ProjectController - ${methodName}:`, '200:Success');
				res.status(200).json({ project : data });
			})
			.catch((err) => {
				if (err && err.message) {
					this.sendErrorResponse(res, 500, methodName, err.message);
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
		let uid = req.query.uid ? req.query.uid : null;
		let methodName = 'getProject';
		Project.getProjects(uid)
			.then((doc) => {
				if (!doc) {
					return this.sendErrorResponse(res, 204, methodName, 'The projects with that uid not exist');
				}

				logger.info(`ProjectController - ${methodName}:`, '200:Success');
				res.status(200).json({
				 	projects : doc
				});
			})
			.catch((err) => {
				if (err) {
					return this.sendErrorResponse(res, 500, methodName, 'Try doing request later');
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
				logger.info(`ProjectController - ${methodName}:`, 'No create');
				this.sendErrorResponse(res, 400, methodName, 'The project is already exist');
			} else {
				logger.info(`ProjectController - ${methodName}:`, 'Recreate');
				body._uid = user._id;
			}
		} else {
			logger.info(`ProjectController - ${methodName}:`, 'Create');
			body._uid = user._id;
		}
		delete body._id;

		let project = new Project(body);
		logger.info(project.toString());
		project.save()
			.then((data) => {
				logger.info(`ProjectController - ${methodName}:`, '201:Create');
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
					this.sendErrorResponse(res, 400, methodName, err.message);
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
		let opt = { upsert : true };

		if (body._uid !== user._id) {
			this.postProject(req, res);
			return ;
		}

		logger.info(body.toString());
		Project.update({ _id : id }, body, opt).exec()
			.then((data) => {
				logger.info(`ProjectController - ${methodName}:`, '200:OK');
				let result = {
					_id : body._id.toString(),
					_uid : body._uid.toString()
				};
				res.status(200).json({
					project : result
				});
			})
			.catch((err) => {
				if (err) {
					this.sendErrorResponse(res, 400, methodName, err.message);
				}
			});
	}

	sendErrorResponse (resp, code, method, message) {
		logger.error(`AuthController - ${method}:`, `Status - ${code} -`, message);
		return resp.status(code).json({ 'error' : message });
	}
}

module.exports = new ProjectController();
