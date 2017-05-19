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
		Project.getProject(req.params.id)
			.then((doc) => {
				if (!doc) {
					return this.sendErrorResponse(res, 400, methodName, 'The project with that id not exist');
				}

				logger.info(`ProjectController - ${methodName}:`, '200:Success');
				res.status(200).json({
				 	project : doc
				});
			})
			.catch((err) => {
				if (err) {
					return this.sendErrorResponse(res, 500, methodName, 'Try doing request later');
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
				 	project : doc
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
		logger.info(`AuthController - ${method}:`, 'body -', body.toString());
		let user = req.user;
		logger.info(`AuthController - ${method}:`, 'user -', user.toString());

		if (body._id) {
			if (body._uid === user._id) {
				this.sendErrorResponse(res, 400, methodName, 'The project is already exist');
			} else {
				delete body._id;
				body._uid = user._id;
			}
		} else {
			body._uid = user._id;
		}

		let project = new Project(body);
		logger.info(project.toString());
		project.save()
			.then((data) => {
				logger.info(`ProjectController - ${methodName}:`, '201:Create');
				res.status(201).json({
					_id : data._id.toString()
				});
			})
			.catch((err) => {
				if (err) {
					logger.warn(err.message);
					this.sendErrorResponse(res, 400, methodName, err.message);
				}
			});
	}

	sendErrorResponse (resp, code, method, message) {
		logger.warn(`AuthController - ${method}:`, `Status - ${code} -`, message);
		return resp.status(code).json({ 'error' : message });
	}
}

/*
let projectData = {
	_id : '591e4a005f024f3e08422a35',
	_uid : '591b13902f92cf326cdecc60',
	name : 'Project',
	workspace : {
		x : 0,
		y : 0,
		width : 2000,
		height : 2000,
		material : {
			type : 'color',
			data : {
				red : 255,
				green : 255,
				blue : 255,
				alfa : 1
			}
		}
	},
	surfaces : [
		{
			id : 0,
			x : 10,
			y : 10,
			stroke : {
				type : 'color',
				data : {
					red : 255,
					green : 255,
					blue : 255,
					alfa : 1
				}
			},
			fill : {
				type : 'none',
				data : null
			},
			points : [
				{	x : 0, y : 0 },
				{	x : 500, y : 0 },
				{	x : 500, y : 500 },
				{	x : 0, y : 500 }
			]
		}
	]
};

//delete projectData._id;

let project = new Project (projectData);
//logger.info(project.toString());

project.save().then((data) => {
	logger.info(data.toString());
	logger.info(data._id.toString());
})
.catch((err) => {
	if (err) {
		logger.warn(err.message);
		//logger.warn(err);
	}
});
*/

module.exports = new ProjectController();
