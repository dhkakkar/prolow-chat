const sqlConfig = require('./config/appConfig.json').sqlConfig

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = { sequelize }