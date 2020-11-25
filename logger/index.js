const appRoot = require('app-root-path');
const winston = require('winston');

const {
  combine, timestamp, prettyPrint, colorize, simple,
} = winston.format;

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: combine(
      timestamp(),
      prettyPrint(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      timestamp(),
      colorize(),
      simple(),
    ),
  },
};

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

if (process.env.NODE_ENV === 'test') {
  logger.silent = true;
}

module.exports = logger;
