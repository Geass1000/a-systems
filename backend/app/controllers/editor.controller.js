'use strict';

let logger = require('../config/logger.config');

let Texture = require('../models/texture.model');

/**
 * Контроллер редактора.
 *
 * @class EditorController
 */
class EditorController {
	/**
	 * Конструктор. Получение из БД максимального ID.
	 *
	 * @class EditorController
	 * @constructor
	 */
	constructor () {
		this.maxTextureId = 0;
		Texture.findMaxTextureId()
			.then((doc) => {
				this.maxTextureId = doc.t_id ? doc.t_id + 1 : 0;
			})
			.catch((err) => {
				logger.warn(err);
			});
	}

	/**
 	 * Получение всех текстур из БД 'textures'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class EditorController
 	 * @method getTextures
 	 */
	getTextures (req, res) {
		Texture.getAllTextures()
			.then((doc) => {
				logger.info(doc);

				res.status(200).json({
					"textures" : doc
				});
			})
			.catch((err) => {
				if (err) {
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}
}

module.exports = new EditorController();
