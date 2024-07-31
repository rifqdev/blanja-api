const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/db/db");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    order_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    custommer_id: {
      type: DataTypes.UUID,
    },
    seller_id: {
      type: DataTypes.UUID,
    },
    custommer_address: {
      type: DataTypes.JSON,
    },
    status: {
      type: DataTypes.STRING,
    },
    products: {
      type: DataTypes.JSON,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Order;
