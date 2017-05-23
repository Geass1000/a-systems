let logger = require('../config/logger.config');

class MongoError {
	constructor (className) {
		if (!className || !(typeof className === 'string')) {
			throw new Error('All params is required!');
		}
		this.className = className;
		this.errors = require(`../assets/errors/${this.className}.error.js`);
	}

	getErrorMessage (error, methodName) {
		let serverError = 'Server error. Try connected later.';

		if (!error || !methodName || !(typeof methodName === 'string')) {
			return serverError;
		}
		logger.info(`${this.constructor.name} - getErrorMessage:`, error.message);

		let methodErrors = this.errors && this.errors[methodName];

		if (!methodErrors) {
			logger.error(`${this.constructor.name} - getErrorMessage:`, 'Messages of errors not exist!');
			return error.message || serverError;
		}

		logger.info(`${this.constructor.name} - getErrorMessage:`, 'Error name', error.name);
		if (error.name === 'ValidationError') {
			return methodErrors['validator'];
		} else if (error.name === 'MongoError') {
			return methodErrors[error.code.toString()];
		} else if (error.name === 'AppError') {
			return methodErrors[error.code.toString()];
		}

		return error.message || serverError;
	}
}

module.exports = MongoError;
