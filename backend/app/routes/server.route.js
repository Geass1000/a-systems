'use strict';

let express = require('express');
let router = express.Router();

let routerUser = require('./users.route');
//... other routers

/*
 * API paths
 */
router.use('/users', routerUser);
//... other paths

router.use('/api', router);

module.exports = router;
