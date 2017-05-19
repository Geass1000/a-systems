'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let connection = require('../config/mongodb.database');

let surfaceSchema = require('./editor/surface.model').schema;
let thingSchema = require('./editor/thing.model').schema;
let workspaceSchema = require('./editor/workspace.model').schema;
let Workspace = require('./editor/workspace.model').model;

let projectSchema = new Schema({
	_uid : 			{ type : String, required : true },
	name : 			{ type : String, required : true },
	workspace :	{ type : workspaceSchema, required : true },
	surfaces : 	{ type : [surfaceSchema] },
	things : 		{ type : [thingSchema] }
});

/**
 * getProjects - функция-статическая, возвращает список всех существующих проектов
 * или список проектов пользователя (если указан uid).
 *
 * @kind {function}
 * @static
 *
 * @param {number} uid - идентификатор пользователя
 * @return {Promise}
 */
projectSchema.statics.getProjects = function (uid) {
	let sel = '_id name';
	return uid ? this.find({ _uid : uid }).select(sel).exec() :
							this.find().select(sel).exec();
};

/**
 * getProject - функция-статическая, возвращает данные проекта с идентификатором "id".
 * Если "id" не указан, возвращается Promise с результатом null.
 *
 * @kind {function}
 * @static
 *
 * @param {number} id - идентификатор проекта
 * @return {Promise}
 */
projectSchema.statics.getProject = function (id) {
	return id ? this.findById(id).exec() : new Promise((resolve, reject) => resolve(null));
};

module.exports = connection.model('Project', projectSchema);
