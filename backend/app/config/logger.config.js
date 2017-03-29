const winston = require('winston');

const tsFormat = () => (new Date()).toLocaleString();
let logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
    })
  ]
});

module.exports = logger;
