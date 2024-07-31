const { Sequelize, DataTypes } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV;
const config = require("../db/config")[NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false,
});

module.exports = sequelize;
