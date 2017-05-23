let logger = require('../config/logger.config');

class AppError extends Error {
	constructor (code, statusCode) {
		super();

		this.name = 'AppError';
		this.code = code;
		this.statusCode = statusCode || 500;
	}
}

module.exports = AppError;
