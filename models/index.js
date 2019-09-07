'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const utils = require('../helper/utils');

const basename = path.basename(__filename);
const db = {};

// Database Connection
const sequelize = new Sequelize(process.env.DATABASE, process.env.DBUSER, process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
  logging: true,
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
  define: {
    // prevent sequelize from pluralizing table names
    freezeTableName: true,
  },
});
sequelize.authenticate().then(() => {
  utils.infoLog(`${process.env.DATABASE} Database server connected....`);
}).catch((err) => {
  utils.infoLog('Could not connect Database server....');
  utils.errorLog(err);
});

// Import Models
fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file) => {
  const model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sync Database
sequelize.sync();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
