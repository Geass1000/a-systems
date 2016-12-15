'use strict';

let dotenv = require('dotenv');
let Server = require('./server');

dotenv.config({path: './.env'});

Server.bootstrapServer();
