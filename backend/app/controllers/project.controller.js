'use strict';

let logger = require('../config/logger.config');

let Project = require('../models/project.model');

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

	getProject (req, res) {
		return res.send('getProject');
	}

}

let projectData = {
	_uid : '591b13902f92cf326cdecc60',
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
	}
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

module.exports = new ProjectController();
