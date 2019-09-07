const orderService = require('./orderService');
const { ERROR500 } = require('../../../helper/commonConstants');
const utils = require('../../../helper/utils');

const orderCtr = {};

orderCtr.createOrder = async (req, res) => {
  try {
    const queryResponse = await orderService.createOrder(req.body);
    return res.status(200).json({ message: req.t('ORDER_SUCCESS'), orderId: queryResponse.id });
  } catch (error) {
    utils.errorLog('Error in Order Create', error);
    return res.status(ERROR500.CODE).json({
      message: ERROR500.MESSAGE,
    });
  }
};

module.exports = orderCtr;
