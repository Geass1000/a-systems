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

router.route('/session')
			.post(AuthController.sessionCreate);

router.route('/users')
			.post(AuthController.addUser);
router.route('/users/:id')
			.get(jwtCheck, AuthController.getUser);

//... other paths

module.exports = router;
