'use strict';

let express = require('express');
let router = express.Router();

let routerUser = require('./user.route');

/*
 * API paths
 */
router.use('/', routerUser);
//... other paths

router.use('/api', router);

module.exports = router;
