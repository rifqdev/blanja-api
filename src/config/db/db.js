const { Sequelize, DataTypes } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV;
const config = require("../db/config")[NODE_ENV];
console.log(config)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
});

module.exports = sequelize;
