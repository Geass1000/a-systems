'use strict';

let express = require('express');
let router = express.Router();

let UserController = require('../controllers/user.controller');
//... other controllers

router.get('/', [UserController.log, UserController.signup]);
//... other methods

//... other paths

router.use('/user', router);

module.exports = router;
