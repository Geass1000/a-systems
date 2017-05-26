'use strict';

/**
 * The validator for data user.
 *
 * @class Server
 */
class UserValidator {

	/**
	 * Constructor.
	 *
	 * @class UserValidator
	 * @constructor
	 */
	constuctor () { ; }

	/**
	 * Validation email.
	 *
	 * @class UserValidator
	 * @method isEmail
	 */
	static isEmail (val) {
		if (typeof val !== 'string') return false;
		let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
		return regexp.test(val);
	}

	/**
	 * Validation login.
	 *
	 * @class UserValidator
	 * @method isLogin
	 */
	static isLogin (val) {
		if (typeof val !== 'string') return false;
    let regexp = /^[A-Za-z0-9\-\_]{3,100}$/;
    return regexp.test(val);
  }

	/**
	 * Validation password.
	 *
	 * @class UserValidator
	 * @method isPassword
	 */
  static isPassword (val) {
		if (typeof val !== 'string') return false;
    let regexp = /^.{8,50}$/;
    return regexp.test(val);
  }
}

module.exports = UserValidator;
