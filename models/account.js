'use strict';

const { accountConstant } = require('../helper/modalConstants');

module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('account', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
    },
    lastName: {
      type: DataTypes.STRING(30),
    },
    mobileNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: accountConstant.accountStatus,
      defaultValue: accountConstant.defaultAccountStatus,
    },
    type: {
      type: DataTypes.ENUM,
      values: accountConstant.accountType,
      defaultValue: accountConstant.defaultAccountType,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  return account;
};
