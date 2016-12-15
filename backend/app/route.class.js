'use strict';

/**
 * The route.
 *
 * @class Route
 */
class Route {
	/**
	 * Create the router object.
	 *
	 * @class Route
	 * @constructor
	 */
	static create () {
		return new Route();
	}

	/**
	 * Constructor.
	 *
	 * @class Route
	 * @constructor
	 */
	constructor () {
		this._get = [];

		this._post = [];

		this._put = [];

		this._delete = [];
	}


	/**
	 * Route methods.
	 *
	 * @class Route
	 * @method Route methods
	 */
	get (path, fn) {
		if (arguments.length === 0) return this._get;
		let obj = this.paramParser(path, fn)
		this._get.push(obj);
	}
	post (path, fn) {
		if (arguments.length === 0) return this._post;
		let obj = this.paramParser(path, fn)
		this._post.push(obj);
	}
	put (path, fn) {
		if (arguments.length === 0) return this._put;
		let obj = this.paramParser(path, fn)
		this._put.push(obj);
	}
	delete (path, fn) {
		if (arguments.length === 0) return this._delete;
		let obj = this.paramParser(path, fn)
		this._delete.push(obj);
	}

	/**
	 * Parser arguments route methods.
	 *
	 * @class Route
	 * @method paramParser
	 */
	paramParser (path, fn) {
		let obj = {
			path: null,
			controller: null,
			middleware: null
		};

		if (typeof path !== 'string')
			throw new Error("Fild path isn't exist");
		obj.path = path;

		if (typeof fn === 'function')
			obj.controller = fn;
		else if (typeof fn === 'object') {
			if (typeof fn.controller !== 'function')
				throw new Error("Fild controller isn't exist");
			obj.controller = fn.controller;

			if (typeof fn.middleware === 'function')
				obj.middleware = fn.middleware;
			else if (Array.isArray(fn.middleware)) {
				obj.middleware = fn.middleware.filter((d) => {
					return typeof d === 'function';
				});
			}
		}
		else
			throw new Error("Fild controller isn't exist");

		return obj;
	}
}

module.exports = Route;
