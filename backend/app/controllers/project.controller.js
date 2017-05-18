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

module.exports = new ProjectController();
