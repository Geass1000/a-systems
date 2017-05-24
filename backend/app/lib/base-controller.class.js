const logger = require('../config/logger.config');
const MongoError = require('./mongo-error.class');

class BaseController {
	constructor (childFileName) {
		this.mongoError = new MongoError(childFileName);
		this.logger = logger;
	}

	sendSuccessResponse (resp, code, data, method, message) {
		this.logger.info(`${this.constructor.name} - ${method}:`, `${code} -`, message);
		return resp.status(code).json(data);
	}
	sendErrorResponse (resp, error, methodName) {
		let message = this.mongoError.getErrorMessage(error, methodName);
		let statusCode = error.statusCode ? error.statusCode : 500;
		this.logger.error(`${this.constructor.name} - ${methodName}:`, `${statusCode} -`, message);
		return resp.status(statusCode).json({ 'error' : message });
	}
}

module.exports = BaseController;
