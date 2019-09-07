'use strict';

const { orderConstant } = require('../helper/modalConstants');

module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      index: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: orderConstant.status,
      defaultValue: orderConstant.defaultStatus,
    },
    address: {
      type: DataTypes.STRING(30),
    },
    state: {
      type: DataTypes.STRING(30),
    },
    pincode: {
      type: DataTypes.INTEGER,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  orders.associate = (models) => {
    // associations can be defined here
    orders.belongsTo(models.account, { foreignKey: 'accountId' });
    models.account.hasMany(models.orders, { foreignKey: 'accountId' });
  };
  return orders;
};
