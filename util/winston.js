const { json } = require("express");
const winston = require("winston");

// here I have created a logger to log on loglevel that is info
// main reason of using info loglevel is that it will log the error as well as the info
// the logging can be useful for scaling the web server as we are keeping record of error
// this logged error can be used to debug the error
const logFileTransPort = new winston.transports.File({
  filename: `./log/error.log`,
  level: "info",
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  datePattern: "YYYY-MM-DD",
  zippedArchive: false,
});

// we can also use dailyRotatefile to get the error.log file separate for each day

const logger = winston.createLogger({
  transports: [logFileTransPort],
  exitOnError: false,
});

module.exports = {
  logger,
};
