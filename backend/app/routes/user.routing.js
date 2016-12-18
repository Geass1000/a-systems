'use strict';

let Route = require('../lib/route.class').create();

let UserController = require('./user.controller').create();
//...

Route.put('/', UserController.index);
//...

Route.use('/user', Route);

module.exports = Route;
