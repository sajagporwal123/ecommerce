const momentTz = require('moment-timezone');

const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  combine,
  timestamp,
  prettyPrint,
} = format;
require('winston-daily-rotate-file');

const transport = new (transports.DailyRotateFile)({
  filename: `${process.env.NODE_ENV}-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20g',
  maxFiles: '14d',
  dirname: '../logs',
  localTime: true,
});

const getTimeStamp = () => {
  return momentTz.tz(new Date(), process.env.TIMEZONE).format();
};

const logger = createLogger({
  format: combine(
    timestamp({
      format: getTimeStamp(),
    }),
    prettyPrint(),
  ),
  transports: [
    transport,
  ],
});

const dbTransport = new (transports.DailyRotateFile)({
  filename: `${process.env.NODE_ENV}-dbtransport-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20g',
  maxFiles: '14d',
  dirname: '../logs',
  localTime: true,
});

const dbLogger = createLogger({
  format: combine(
    timestamp({
      format: getTimeStamp(),
    }),
    prettyPrint(),
  ),
  transports: [
    dbTransport,
  ],
});

const winston = logger;
module.exports = {
  winston,
  dbLogger,
};
