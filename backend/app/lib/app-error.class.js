let logger = require('../config/logger.config');

class AppError extends Error {
	constructor (code) {
		super();

		this.name = 'AppError';
		this.code = code;
	}
}

module.exports = AppError;
