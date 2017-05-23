const logger = require('../config/logger.config');
const MongoError = require('./mongo-error.class');

class BaseController {
	constructor (childFileName) {
		this.mongoError = new MongoError(childFileName);
	}

	sendErrorResponse (resp, code, method, message) {
		logger.error(`${this.constructor.name} - ${method}:`, `Status - ${code} -`, message);
		return resp.status(code).json({ 'error' : message });
	}
}

module.exports = BaseController;
