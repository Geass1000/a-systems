'use strict';

let Route = require('../lib/route.class').create();

let routeAuth = require('./user.routing');

Route.use('/', routeAuth);

Route.use('/app', Route);

module.exports = Route;
