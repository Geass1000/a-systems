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

//... Texture
router.route('/texture')
			.get(EditorController.getAllTextures);
router.route('/texture/type')
			.get(EditorController.getAllTextureCategories);

//... Item
router.route('/item')
			.get(EditorController.getAllItems);
router.route('/item/category')
			.get(EditorController.getAllItemCategories);

//... Project
router.route('/project')
			.get(ProjectController.getProjects);
router.route('/project/:id')
			.get(ProjectController.getProject);

//... other paths

//... Root path
router.use('/editor', router);

module.exports = router;
