'use strict';

let Route = require('../lib/route.class').create();

let UserController = require('../controllers/user.controller').create();
//... other controllers

Route.put('/', UserController.signup);
//... other methods

//... other paths

Route.use('/user', Route);

module.exports = Route;
