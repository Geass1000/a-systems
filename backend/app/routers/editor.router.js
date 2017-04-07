'use strict';

let express = require('express');
let router = express.Router();

let EditorController = require('../controllers/editor.controller');
//... other controllers

let config = require('../config/app.config');

let jwt = require('express-jwt');
let jwtCheck = jwt({
  secret: config.secret
});

router.route('/texture')
			.get(EditorController.getTextures)
			.put(EditorController.addTexture);
//... other paths

router.use('/editor', router);

module.exports = router;