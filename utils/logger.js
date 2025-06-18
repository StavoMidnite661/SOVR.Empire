const winston = require("winston")

// Define log format
const logFormat = winston.format.combine(winston.format.timestamp(), winston.format.json())

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  defaultMeta: { service: "sovr-webhook" },
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    // File transport for errors
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: "logs/combined.log",
    }),
  ],
})

// Add stream for Morgan HTTP logger
logger.stream = {
  write: (message) => {
    logger.info(message.trim())
  },
}

module.exports = { logger }
