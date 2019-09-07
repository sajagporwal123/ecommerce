const express = require('express');

const orderRouter = express.Router();
const orderCtr = require('./orderController');
const orderMiddleware = require('./orderMiddleware');
const { validationHandler } = require('../../../helper/validate');
const auth = require('../../../helper/auth');

// Create Order Route
const createOrderMiddleware = [
  orderMiddleware.createOrderValidator(),
  validationHandler,
  auth.validateUser,
  orderMiddleware.checkAvailablityOfInventory,
  orderCtr.createOrder];
orderRouter.post('/create', createOrderMiddleware);
module.exports = orderRouter;
