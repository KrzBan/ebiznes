const { Sequelize } = require('sequelize');

const config = require('../config');

const dbName = config.DB_FILE_NAME;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: `${dbName}`
});

module.exports = sequelize;
