'use strict';

let Route = require('../lib/route.class').create();

let UserController = require('../controllers/user.controller').create();
//... New controllers

Route.put('/', UserController.signup);
//... New methods

//... New paths

Route.use('/user', Route);

module.exports = Route;
