'use strict';
let Route = require('../route.class').create();

let SignupController = require('./signup.controller').create();

Route.put('/signup', SignupController.index);

Route.use('/auth', Route);

module.exports = Route;
