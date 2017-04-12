'use strict';

let logger = require('../config/logger.config');

let Texture = require('../models/texture.model');
let TextureType = require('../models/texture-type.model');

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
		let type = req.query.type ? req.query.type.split(" ") : null;

		Texture.getAllTextures(type)
			.then((doc) => {
				logger.info('EditorController: getTextures', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getTextures', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getTextures', '200:Success');
					res.status(200).json({
						"textures" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getTextures', '500:Error!');
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}

	/**
 	 * Получение текстуры из БД 'textures'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class EditorController
 	 * @method getTextures
 	 */
	addTexture (req, res) {
		let info = req.body;
		if(!(info.type && info.size && info.names && info.url)) {
			res.status(400).json({ "message" : "All fields required" });
			return;
		}

		let texture = new Texture ({
			type : info.type,
			url : info.url,
			size : info.size,
			names : info.names
		});
		texture.save()
			.then((doc) => {
				res.status(201).json({
					"texture" : JSON.stringify(doc)
				});
			})
			.catch((err) => {
				if (err) {
					logger.error(err);
					res.status(500).json({ "message" : "Try later" });
					return;
				}
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
	getAllTextureTypes (req, res) {
		TextureType.getAllTextureTypes()
			.then((doc) => {
				logger.info('EditorController: getAllTextureTypes', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getAllTextureTypes', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getAllTextureTypes', '200:Success');
					res.status(200).json({
						"types" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getAllTextureTypes', '500:Error!');
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}
}

module.exports = new EditorController();
