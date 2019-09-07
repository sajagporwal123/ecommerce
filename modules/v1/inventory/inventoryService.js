const model = require('../../../models/index');

const { Op } = model.Sequelize;
const inventoryService = {};

inventoryService.createInventory = async (data) => {
  return model.inventory.create(data);
};

inventoryService.bulkInventoryUpdate = (list, transaction) => {
  return new Promise((resolve, reject) => {
    try {
      const queryArray = [];
      list.map((order) => {
        queryArray.push(model.inventory.update(
          {
            availableQuantity: model.sequelize.literal(`availableQuantity - ${order.quantity}`),
          },
          {
            where:
            {
              id: order.inventoryId,
            },
            transaction,
          },
        ));
        return list;
      });
      resolve(queryArray);
    } catch (err) {
      reject(err);
    }
  });
};

inventoryService.findInventory = (idList) => {
  return model.inventory.findAll({
    where: {
      id: {
        [Op.in]: idList,
      },
    },
    attributes: ['id', 'availableQuantity'],
  });
};
module.exports = inventoryService;
