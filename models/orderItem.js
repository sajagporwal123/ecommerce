'use strict';

module.exports = (sequelize, DataTypes) => {
  const orderItem = sequelize.define('orderItem', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inventoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  orderItem.associate = (models) => {
    // associations can be defined here
    orderItem.belongsTo(models.orders, { foreignKey: 'orderId' });
    models.orders.hasMany(models.orderItem, { foreignKey: 'orderId' });
    orderItem.belongsTo(models.inventory, { foreignKey: 'inventoryId' });
    models.inventory.hasMany(models.orderItem, { foreignKey: 'inventoryId' });
  };
  return orderItem;
};
