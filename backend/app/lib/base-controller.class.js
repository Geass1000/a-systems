const logger = require('../config/logger.config');
const MongoError = require('./mongo-error.class');

class BaseController {
	constructor (childFileName) {
		this.mongoError = new MongoError(childFileName);
		this.logger = logger;
	}

	/**
	 * sendSuccessResponse - выполняет отправку успешного ответа.
	 *
	 * @method
	 *
	 * @param {Response} resp - объект ответа
	 * @param {number} code - статус код
	 * @param {Object} data - объект с данными
	 * @param {string} methodName - имя метода
	 * @param {string} message - сообщение для логгера
	 * @return {void}
	 */
	sendSuccessResponse (resp, code, data, methodName, message) {
		this.logger.info(`${this.constructor.name} - ${methodName}:`, `${code} -`, message);
		resp.status(code).json(data);
	}

	/**
	 * sendErrorResponse - выполняет отправку ошибочного ответа.
	 *
	 * @method
	 *
	 * @param {Response} resp - объект ответа
	 * @param {Object} error - объект ошибки
	 * @param {string} methodName - имя метода
	 * @return {void}
	 */
	sendErrorResponse (resp, error, methodName) {
		let message = this.mongoError.getErrorMessage(error, methodName);
		let statusCode = error.statusCode ? error.statusCode : 500;
		this.logger.error(`${this.constructor.name} - ${methodName}:`, `${statusCode} -`, message);
		resp.status(statusCode).json({ 'error' : message });
	}
}

module.exports = BaseController;
