'use strict';

let Route = require('../lib/route.class').create();

let routeUser = require('./user.routing');

Route.use('/', routeUser);
//... other paths

Route.use('/app', Route);

module.exports = Route;
