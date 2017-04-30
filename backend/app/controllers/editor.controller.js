'use strict';

let logger = require('../config/logger.config');

let TextureCategory = require('../models/texture-category.model');
let Texture = require('../models/texture.model');
let ItemCategory = require('../models/item-category.model');
let Item = require('../models/item.model');

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
 	 * @method getAllTextures
 	 */
	getAllTextures (req, res) {
		let type = req.query.type ? req.query.type.split(" ") : null;

		Texture.getAllTextures(type)
			.then((doc) => {
				logger.info('EditorController: getAllTextures', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getAllTextures', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getAllTextures', '200:Success');
					res.status(200).json({
						"textures" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getAllTextures', '500:Error!');
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
 	 * @method addTexture
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
 	 * @method getAllTextureCategories
 	 */
	getAllTextureCategories (req, res) {
		TextureCategory.getAllTextureCategories()
			.then((doc) => {
				logger.info('EditorController: getAllTextureCategories', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getAllTextureCategories', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getAllTextureCategories', '200:Success');
					res.status(200).json({
						"categories" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getAllTextureCategories', '500:Error!');
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}

	/**
 	 * Получение всех категорий предметов из БД 'ItemCategory'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class EditorController
 	 * @method getAllItemCategories
 	 */
	getAllItemCategories (req, res) {
		ItemCategory.getAllItemCategories()
			.then((doc) => {
				logger.info('EditorController: getAllItemCategories', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getAllItemCategories', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getAllItemCategories', '200:Success');
					res.status(200).json({
						"categories" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getAllItemCategories', '500:Error!');
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}
	/**
 	 * Получение всех предметов из БД 'Item'.
 	 *
 	 * @param {express.Request} req
 	 * @param {express.Response} res
 	 *
 	 * @class EditorController
 	 * @method getAllItems
 	 */
	getAllItems (req, res) {
		Item.getAllItems()
			.then((doc) => {
				logger.info('EditorController: getAllItems', JSON.stringify(doc));
				if (doc.length === 0) {
					logger.info('EditorController: getAllItems', '204:No Content');
					res.status(204).send();
				}
				else {
					logger.info('EditorController: getAllItems', '200:Success');
					res.status(200).json({
						"items" : doc
					});
				}
			})
			.catch((err) => {
				if (err) {
					logger.info('EditorController: getAllItems', '500:Error!');
					res.status(500).json({ "message" : "Try later" });
					return;
				}
			});
	}
}

module.exports = new EditorController();
