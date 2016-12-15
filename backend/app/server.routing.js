'use strict';

let Route = require('./route.class').create();

Route.get('/', HomeController.index);

module.exports = Route;
