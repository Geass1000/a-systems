'use strict';

let express = require('express');
let router = express.Router();

let EditorController = require('../controllers/editor.controller');
let ProjectController = require('../controllers/project.controller');
//... other controllers

let config = require('../config/app.config');

let jwt = require('express-jwt');
let jwtCheck = jwt({
  secret: config.secret
});

router.route('/texture')
			.get(EditorController.getAllTextures)
			.put(EditorController.addTexture);
router.route('/texture/type')
			.get(EditorController.getAllTextureCategories);

router.route('/item')
			.get(EditorController.getAllItems);
router.route('/item/category')
			.get(EditorController.getAllItemCategories);

router.route('/project/:id')
			.get(ProjectController.getProject);
//... other paths

router.use('/editor', router);

module.exports = router;
