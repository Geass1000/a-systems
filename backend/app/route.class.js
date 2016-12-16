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

		if (!this.checkingPath(path))
			throw new Error("Path isn't valid");
		else if (typeof fn === 'function')
			obj.controller = fn;
		else if (typeof fn === 'object') {
			if (typeof fn.controller !== 'function')
				throw new Error("Controller isn't exist");
			obj.controller = fn.controller;

			if (typeof fn.middleware === 'function')
				obj.middleware = fn.middleware;
			else if (Array.isArray(fn.middleware)) {
				obj.middleware = fn.middleware.filter((data) => {
					return typeof data === 'function';
				});
			}
		}
		else
			throw new Error("Controller isn't exist");

		if (path.length !== 1 && path[path.length - 1] === '/')
			path = path.slice(0, path.length - 1);
		obj.path = path;

		return obj;
	}

	/**
	 * Concate path other route.
	 *
	 * @class Route
	 * @method use
	 */
	use (path, route) {
		if (!this.checkingPath(path))
			throw new Error("Path isn't valid");
		if (!(route instanceof Route))
			throw new Error("Route isn't object class Route");

		// Correction path
		if (path[path.length - 1] === '/')
			path = path.slice(0, path.length - 1);

		let arr = [];
		for (let data of route) {
			arr.push(data.map((data) => {
				data.path = path + data.path;
				return data;
			}));
		}

		if (this !== route) {
			this._get = this._get.concat(arr[0]);
			this._post = this._post.concat(arr[1]);
			this._put = this._put.concat(arr[2]);
			this._delete = this._delete.concat(arr[3]);
		}
	}

	/**
	 * Cheking path-route.
	 *
	 * @class Route
	 * @method checkingPath
	 */
	checkingPath (path) {
		return typeof path === 'string' && /^\/([^\/]+\/?)*$/.test(path);
	}

	/**
	 * Iterator.
	 *
	 * @class Route
	 * @method Iterator
	 */
	*[Symbol.iterator] () {
		yield* [this._get, this._post, this._put, this._delete];
	}
}

module.exports = Route;
