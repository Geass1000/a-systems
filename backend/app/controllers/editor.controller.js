'use strict';

const path = require('path');
let scriptName = path.basename(__filename, path.extname(__filename));

const logger = require('../config/logger.config');

const BaseController = require('../lib/base-controller.class');
const AppError = require('../lib/app-error.class');

const TextureCategory = require('../models/texture-category.model');
const Texture = require('../models/texture.model');
const ItemCategory = require('../models/item-category.model');
const Item = require('../models/item.model');

/**
 * Контроллер редактора.
 *
 * @class EditorController
 */
class EditorController extends BaseController {
	/**
	 * Конструктор. Получение из БД максимального ID.
	 *
	 * @class EditorController
	 * @constructor
	 */
	constructor () {
		super(scriptName);
	}

	/**
	 * postLogin - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о категориях текстур из БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getTextureCategories (req, res) {
		let message, methodName = 'getTextureCategories';

		TextureCategory.getAllTextureCategories()
			.then((data) => {
				if (!data || !data.length) {
					throw new AppError('myNotExist', 204);
				}
				
				message = 'Return texture categories';
				return this.sendSuccessResponse(res, 200, { "categories" : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * getTextures - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о текстурах из БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getTextures (req, res) {
		let message, methodName = 'getTextures';

		let category = req.query.category ? req.query.category.split(" ") : null;
		logger.info(`${this.constructor.name} - ${methodName}:`, `category -`, category);

		Texture.getAllTextures(category)
			.then((data) => {
				if (!data || !data.length) {
					throw new AppError('myNotExist', 204);
				}

				message = 'Return user info';
				return this.sendSuccessResponse(res, 200, { "textures" : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * postLogin - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о категориях элементов из БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getItemCategories (req, res) {
		let message, methodName = 'getItemCategories';

		ItemCategory.getAllItemCategories()
			.then((data) => {
				if (!data || !data.length) {
					throw new AppError('myNotExist', 204);
				}

				message = 'Return texture categories';
				return this.sendSuccessResponse(res, 200, { "categories" : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}

	/**
	 * postLogin - функция-контроллер, выполняет обработку запроса о извлечении информации
	 * о элементах из БД.
	 *
	 * @method
	 * @param {Request} req - объект запроса
	 * @param {Response} res - объект ответа
	 * @return {void}
	 */
	getItems (req, res) {
		let message, methodName = 'getItems';

		Item.getAllItems()
			.then((data) => {
				if (!data || !data.length) {
					throw new AppError('myNotExist', 204);
				}

				message = 'Return texture categories';
				return this.sendSuccessResponse(res, 200, { "items" : data }, methodName, message);
			})
			.catch((err) => this.sendErrorResponse(res, err, methodName));
	}
}

module.exports = new EditorController();
