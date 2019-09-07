const orderHelper = {};

// Adding Order Id in Inventory
orderHelper.createOrderItemList = (list, orderId) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(list.map((order) => {
        const o = { ...order };
        o.orderId = orderId;
        return o;
      }));
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = orderHelper;
