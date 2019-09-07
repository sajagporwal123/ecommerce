const model = require('../../../models');
const orderHelper = require('./orderHelper');
const inventoryService = require('../inventory/inventoryService');

const orderService = {};

// Create Order
orderService.createOrder = (data) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let transaction;
    try {
      transaction = await model.sequelize.transaction();
      const orderResult = await model.orders.create(data, { transaction });
      const orderList = await orderHelper.createOrderItemList(data.orderList, orderResult.id);
      await model.orderItem.bulkCreate(orderList, { transaction });
      const queryArray = await inventoryService.bulkInventoryUpdate(orderList, transaction);
      await Promise.all(queryArray);
      await transaction.commit();
      resolve(orderResult);
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      if (transaction) {
        Promise.resolve(transaction.rollback());
      }
      reject(err);
    }
  });
};


module.exports = orderService;
