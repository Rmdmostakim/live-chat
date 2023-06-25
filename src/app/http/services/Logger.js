const winston = require('winston');
const moment = require('moment');
const path =require("path");
const { createLogger, transports } = winston;

const logger = createLogger({
  transports: [
    new transports.File({ filename: path.join(__dirname, '/../../../.storage/.log/error.log'), level: 'error' }),
  ],
});
const Logger = {};
Logger.error = (msg) =>{
    logger.log({
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        level: 'error',
        message: msg
      })
}
Logger.warn = (msg) =>{
    logger.warn(msg);
}
Logger.info = (msg) =>{
    logger.info(msg);
}

module.exports = Logger;