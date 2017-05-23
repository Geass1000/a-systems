'use strict';

let express = require('express');
let router = express.Router();

let UserController = require('../controllers/user.controller');
//... other controllers

let config = require('../config/app.config');

let jwt = require('express-jwt');
let jwtCheck = jwt({
  secret: config.secret
});

router.route('/auth')
			.post(UserController.postLogin.bind(UserController));

router.route('/users')
			.post(UserController.postUser.bind(UserController));
router.route('/users/:name')
			.get(jwtCheck, UserController.getUser.bind(UserController));

//... other paths

module.exports = router;
