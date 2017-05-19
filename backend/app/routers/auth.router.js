'use strict';

let express = require('express');
let router = express.Router();

let AuthController = require('../controllers/auth.controller');
//... other controllers

let config = require('../config/app.config');

let jwt = require('express-jwt');
let jwtCheck = jwt({
  secret: config.secret
});

router.route('/auth')
			.post(AuthController.login.bind(AuthController));

router.route('/users')
			.post(AuthController.addUser.bind(AuthController));
router.route('/users/:name')
			.get(jwtCheck, AuthController.getUser.bind(AuthController));

//... other paths

module.exports = router;
