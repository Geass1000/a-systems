'use strict';

let Route = require('./route.class').create();

let routeAuth = require('./auth/auth.routing');

Route.use('/', routeAuth);

module.exports = Route;
