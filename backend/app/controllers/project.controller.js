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
	 * getProject -
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

				logger.info(`${className} - ${methodName}:`, '200:Success');
				res.status(200).json({
					"project" : doc
				});
			})
			.catch((err) => {
				if (err) {
					return this.sendErrorResponse(res, 500, methodName, 'Try sign in later');
				}
			});
	}

	// Create
	postProject (req, res) {
		return res.send('postProject');
	}

}

/*
let projectData = {
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


let project = new Project (projectData);
logger.info(project.toString());

project.save().then((user) => {
	logger.info(user.toString());
})
.catch((err) => {
	if (err) {
		logger.warn(err);
	}
});
*/

module.exports = new ProjectController();
