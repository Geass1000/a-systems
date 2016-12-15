'use strict';

let dotenv = require('dotenv');
let Server = require('./server.class');

dotenv.config({path: __dirname + '/../.env'});

Server.bootstrapServer();
