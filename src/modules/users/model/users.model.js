const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db/db");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    birth: {
      type: DataTypes.STRING(50),
    },
    photo: {
      type: DataTypes.STRING(255),
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    account_type: {
      type: DataTypes.STRING(15),
    },
    store_name: {
      type: DataTypes.STRING(50),
    },
    store_description: {
      type: DataTypes.TEXT,
    },
    token: {
      type: DataTypes.STRING(32),
    },
    wallet: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Users;
