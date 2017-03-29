'use strict';

let express = require('express');
let router = express.Router();

let authRouter = require('./auth.router');
let editorRouter = require('./editor.router');
//... other routers

/*
 * API paths
 */
router.use('/', authRouter);
router.use('/', editorRouter);
//... other paths

router.use('/api', router);

module.exports = router;
