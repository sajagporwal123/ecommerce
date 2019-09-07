const { check } = require('express-validator/check');
const inventoryService = require('../inventory/inventoryService');
const { ERROR500 } = require('../../../helper/commonConstants');
const utils = require('../../../helper/utils');

const middleware = {};

// Check Request Body 
middleware.createOrderValidator = () => {
  return [
    check('state').not().isEmpty().isString(),
    check('address').not().isEmpty().isString(),
    check('pincode').isNumeric(),
    check('orderList').isArray().isLength({ min: 1 }),
    check('orderList.*.inventoryId').isInt({ gt: 0 }),
    check('orderList.*.quantity').isInt({ gt: 0 }),
  ];
};

//  Checking Availability OF Inventory
middleware.checkAvailablityOfInventory = async (req, res, next) => {
  try {
    const { orderList } = req.body;
    const inventoryIdList = orderList.map(({ inventoryId }) => { return inventoryId; });
    // Get Available Inventory Quantity
    const availableInventoryList = await inventoryService.findInventory(inventoryIdList);
    const comparer = (inventoryList) => {
      return (current) => {
        return inventoryList.filter((inventory) => {
          return inventory.id === current.inventoryId;
        }).length === 0;
      };
    };
    // Checking Invalid Inventory Request
    const invalidInventoryIdList = orderList.filter(comparer(availableInventoryList));
    if (invalidInventoryIdList && invalidInventoryIdList.length > 0) {
      return res.status(400).json({
        message: req.t('INVALID_INVENTORY_ID'),
        invalidInventoryIdList: invalidInventoryIdList,
      });
    }
    const quantityCheck = (list) => {
      return (current) => {
        return list.filter((order) => {
          return order.quantity <= current.availableQuantity && order.inventoryId === current.id;
        }).length === 0;
      };
    };

    // Checking Request Inventory Qunatity Not More Then Available Quantity
    const quantityCheckResult = availableInventoryList.filter(quantityCheck(orderList));
    if (quantityCheckResult && quantityCheckResult.length > 0) {
      return res.status(400).json({
        message: req.t('UNAVAILABLE_QUANTITY'),
        availableQuantity: quantityCheckResult,
      });
    }
    next();
  } catch (err) {
    utils.errorLog('[Error] in check check availablity of inventory', err);
    return res.status(ERROR500.CODE).json({
      message: req.t(ERROR500.MESSAGE),
    });
  }
};

module.exports = middleware;
