const express = require('express');
const path = require('path');
const utils = require('../../helper/utils');
const { ERROR400 } = require('../../helper/commonConstants');

const router = express.Router();
const apiVersion = path.basename(__filename, '.js');

// Adding Api Version In Request
router.use((req, res, next) => {
  req.apiVersion = apiVersion;
  return next();
});

// Order Routes
router.use('/order', require('./order/orderRoute'));

router.all('/*', (req, res) => {
  utils.infoLog('error log');
  return res.status(ERROR400.CODE).json({
    error: req.t(ERROR400.MESSAGE),
  });
});

module.exports = router;
