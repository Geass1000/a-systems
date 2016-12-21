'use strict';

let express = require('express');
let router = express.Router();

let UserController = require('../controllers/user.controller');
//... other controllers

router.route('/')
			.get(UserController.getAllUsers)
			.post(UserController.addUser);
router.route('/:id')
			.get(UserController.getUser)
			.put(UserController.updateUser)
			.delete(UserController.deleteUser);

//... other paths

module.exports = router;
