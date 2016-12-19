'use strict';

let Route = require('../lib/route.class').create();

let UserController = require('../controllers/user.controller').create();
//... other controllers

Route.get('/', {
	controller : UserController.signup,
	middleware : UserController.log
});
//... other methods

//... other paths

Route.use('/user', Route);

module.exports = Route;
