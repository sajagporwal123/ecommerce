const { winston } = require('./winston');

const utils = {};

utils.errorLog = (...args) => {
  if (process.env.SHOW_LOG === 'true') {
    try {
      winston.error(args);
    } catch (e) {
      winston.log(e);
    }
  }
};

utils.infoLog = (...args) => {
  if (process.env.SHOW_LOG === 'true') {
    try {
      winston.info(args);
    } catch (e) {
      winston.log(e);
    }
  }
};

module.exports = utils;
