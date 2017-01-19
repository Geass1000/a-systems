'use strict';

let express = require('express');
let router = express.Router();

let authRouter = require('./auth.router');
//... other routers

/*
 * API paths
 */
router.use('/', authRouter);
//... other paths

router.use('/api', router);

module.exports = router;
